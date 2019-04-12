---
author: Brian L. Troutwine
date: 2018-09-01T15:09:49+01:00
desc:
  Learn how to use RwLock and CondVars in this tutorial by Brian L. Troutwine, a
  software engineer with an interest in low-latency and high-scale software.
series: rust
image: rust-logo.png
tags:
  - rust
title: Using RwLock and CondVars in Rust
twitter: https://twitter.com/bltroutwine?lang=en
weight: 2
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

# Read many, write exclusive locks – RwLock

Consider a situation where you have a resource that must be manipulated only a
single thread at a time, but is safe to be queried by many—that is, you have
many readers and only one writer.

While you could protect this resource with a `mutex`, the trouble is that the
mutex makes no distinction between its lockers; every thread will be forced to
wait, no matter what their intentions. `RwLock<T>` is an alternative to the
mutex concept, allowing for two kinds of locks—read and write. Analogously to
Rust's references, there can only be one write lock taken at a time but multiple
reader locks, exclusive of a write lock. Here’s an example:

```rust
use std::thread;
use std::sync::{Arc, RwLock};

fn main() {
    let resource: Arc<RwLock<u16>> = Arc::new(RwLock::new(0));

    let total_readers = 5;

    let mut reader_jhs = Vec::with_capacity(total_readers);
    for _ in 0..total_readers {
        let resource = Arc::clone(&resource);
        reader_jhs.push(thread::spawn(move || {
            let mut total_lock_success = 0;
            let mut total_lock_failure = 0;
            let mut total_zeros = 0;
            while total_zeros < 100 {
                match resource.try_read() {
                    Ok(guard) => {
                        total_lock_success += 1;
                        if *guard == 0 {
                            total_zeros += 1;
                        }
                    }
                    Err(_) => {
                        total_lock_failure += 1;
                    }
                }
            }
            (total_lock_failure, total_lock_success)
        }));
    }

    {
        let mut loops = 0;
        while loops < 100 {
            let mut guard = resource.write().unwrap();
            *guard = guard.wrapping_add(1);
            if *guard == 0 {
                loops += 1;
            }
        }
    }

    for jh in reader_jhs {
        println!("{:?}", jh.join().unwrap());
    }
}
```

The idea here is that you'll have one writer thread spinning and incrementing,
in a wrapping fashion, a shared resource—a `u16`. Once the `u16` has been
wrapped 100 times, the writer thread will exit. Meanwhile, a `total_readers`
number of read threads will attempt to take a read lock on the shared resource—a
u16—until it hits zero `100` times. You're gambling here, essentially, on thread
ordering. Quite often, the program will exit with this result:

```rust
(0, 100)
(0, 100)
(0, 100)
(0, 100)
(0, 100)
```

This means that each reader thread never failed to get its read lock—there were
no write locks present. This means that the reader threads were scheduled before
the writer. Your main function only joins on reader handlers, so the writer is
left writing as you exit. Sometimes, you'll hit just the right scheduling order
and get the following result:

```rust
 (0, 100)
(126143752, 2630308)
(0, 100)
(0, 100)
(126463166, 2736405)
```

In this particular instance, the second and final reader threads were scheduled
just after the writer and managed to catch a time when the guard was not zero.
Recall that the first element of the pair is the total number of times the
reader thread was not able to get a read lock and was forced to retry.

The second is the number of times that the lock was acquired. In total, the
writer thread did `(2^18 * 100) ~= 2^24` writes, whereas the second reader
thread did `log_2 2630308 ~= 2^21` reads. That's a lot of lost writes which
maybe okay. Of more concern, that's a lot of useless loops, approximately
`2^26`.

How do you avoid all this wasted effort? Well, like most things, it depends on
what you're trying to do. If you need every reader to get every write, then an
MPSC is a reasonable choice. It would look like this:

```rust
use std::thread;
use std::sync::mpsc;

fn main() {
    let total_readers = 5;
    let mut sends = Vec::with_capacity(total_readers);

    let mut reader_jhs = Vec::with_capacity(total_readers);
    for _ in 0..total_readers {
        let (snd, rcv) = mpsc::sync_channel(64);
        sends.push(snd);
        reader_jhs.push(thread::spawn(move || {
            let mut total_zeros = 0;
            let mut seen_values = 0;
            for v in rcv {
                seen_values += 1;
                if v == 0 {
                    total_zeros += 1;
                }
                if total_zeros >= 100 {
                    break;
                }
            }
            seen_values
        }));
    }

    {
        let mut loops = 0;
        let mut cur: u16 = 0;
        while loops < 100 {
            cur = cur.wrapping_add(1);
            for snd in &sends {
                snd.send(cur).expect("failed to send");
            }
            if cur == 0 {
                loops += 1;
            }
        }
    }

    for jh in reader_jhs {
        println!("{:?}", jh.join().unwrap());
    }
}
```

It will run for a while and print out the following:

```rust
6553600
6553600
6553600
6553600
6553600
```

But what if every reader does not need to see every write, meaning that it's
acceptable for a reader to miss writes so long as it does not miss all of the
writes? You have options.

# Blocking until conditions change – condvar

One such option is a condvar, or CONDition VARiable. Condvars are a nifty way to
block a thread, pending a change in some Boolean condition. One difficulty is
that condvars are associated exclusively with mutexes, but in this example, you
need not mind it all that much.

The way a condvar works is that after taking a lock on a mutex, you pass the
`MutexGuard` into `Condvar::wait`, which blocks the thread. Other threads may go
through this same process, blocking on the same condition. Some other thread
will take the same exclusive lock and eventually call either `notify_one` or
`notify_all` on the condvar.

The first wakes up a single thread; the second wakes up all threads. Condvars
are subject to spurious wakeup, meaning the thread may leave its block without a
notification being sent to it. For this reason, condvars check their conditions
in a loop. But, once the condvar wakes, you are guaranteed to hold the mutex,
which prevents deadlocks on spurious wakeup.

Now adapt your example to use a condvar:

```rust
use std::thread;
use std::sync::{Arc, Condvar, Mutex};

fn main() {
    let total_readers = 5;
    let mutcond: Arc<(Mutex<(bool, u16)>, Condvar)> =
        Arc::new((Mutex::new((false, 0)), Condvar::new()));
```

You're synchronizing threads on `mutcond`, which is an
`Arc<(Mutex<(bool, u16)>, Condvar)>`. Rust's condvar is touch awkward. It's
undefined behavior to associate a condvar with more than one mutex, but there's
really nothing in the type of `Condvar` that makes that an invariant. You just
have to remember to keep them associated.

To that end, it's not uncommon to see a `Mutex` and `Condvar` paired up in a
tuple, as here. Now, why `Mutex<(bool, u16)>?` The second element of the tuple
is your resource, which is common to other examples. The first element is a
Boolean flag, which you use as a signal to mean that there are writes available.
Here are your reader threads:

```rust
    let mut reader_jhs = Vec::with_capacity(total_readers);
    for _ in 0..total_readers {
        let mutcond = Arc::clone(&mutcond);
        reader_jhs.push(thread::spawn(move || {
            let mut total_zeros = 0;
            let mut total_wakes = 0;
            let &(ref mtx, ref cnd) = &*mutcond;

            while total_zeros < 100 {
                let mut guard = mtx.lock().unwrap();
                while !guard.0 {
                    guard = cnd.wait(guard).unwrap();
                }
                guard.0 = false;

                total_wakes += 1;
                if guard.1 == 0 {
                    total_zeros += 1;
                }
            }
            total_wakes
        }));
    }
```

Until `total_zeros` hits 100, the reader thread locks the mutex, checks the
guard inside the mutex for writes availability, and, if there are no writes,
does a wait on the condvar, which gives up the lock. The reader thread is then
blocked until a `notify_all` is called—as you'll see shortly.

Every reader thread then races to be the first to reacquire the lock. The lucky
winner notes that there are no more writes to be read and then does the normal
flow. It bears repeating that every thread that wakes up from a condition wait
is racing to be the first to reacquire the mutex.

Your reader is uncooperative in that; it immediately prevents the chance of any
other reader threads finding a resource available. However, they will still wake
up spuriously and be forced to wait again. Maybe! The reader threads are also
competing with the writer thread to acquire the lock. Now, look at the writer
thread:

```rust
    let _ = thread::spawn(move || {
        let &(ref mtx, ref cnd) = &*mutcond;
        loop {
            let mut guard = mtx.lock().unwrap();
            guard.1 = guard.1.wrapping_add(1);
            guard.0 = true;
            cnd.notify_all();
        }
    });
```

The writer thread is an infinite loop, which you orphan in an unjoined thread.
Now, it's entirely possible that the writer thread will acquire the lock, bump
the resource, notify waiting reader threads, give up the lock, and then
immediately re-acquire the lock to begin the whole process before any reader
threads can get scheduled in.

This means it's entirely possible that the resource being zero will happen
several times before a reader thread is lucky enough to notice. Now close this
program:

```rust
    for jh in reader_jhs {
        println!("{:?}", jh.join().unwrap());
    }
}
```

Ideally, what you'd like is some manner of bi-directionality—you'd like the
writer to signal that there are reads and the reader to signal that there is
capacity. You might, for instance, layer another condition variable into the
mix, this one for the writer, but that's not what you have here and the program
suffers for it. Here's one run:

```rust
7243473
6890156
6018468
6775609
6192116
```

Phew! That's significantly more loops than the previous example. None of this is
to say that condition variables are hard to use—they're not—it's just that they
need to be used in conjunction with other primitives.

> If you found this article interesting, you can explore
> [Hands-On Concurrency with Rust](https://amzn.to/2Plm1qY) to get to grips with
> modern software demands by learning the effective uses of Rust's powerful
> memory safety. This book will teach you how to manage program performance on
> modern machines and build fast, memory-safe, and concurrent software in Rust.
