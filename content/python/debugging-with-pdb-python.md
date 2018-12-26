---
author: Elliot Forbes
date: 2017-09-02T13:35:28+01:00
desc: In this tutorial we look at how you can debug your Python programs with the
  python debugger - PDB
series: python
image: python-logo.png
tags:
- debugging
title: 'Debugging with the Python Debugger - PDB '
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 7
---

In this tutorial we'll be having a look at the Python Debugger, what it is and how you can use it to effectively debug your Python applications. 

Knowing how to debug your code is an incredibly important tool in any programmers arsenal. Thankfully Python comes with the excellent PDB or Python DeBugger which allows us to step through our code and effectively work out what has gone wrong. 

> The official documentation for the Python Debugger can be found here: [Python Debugger](https://docs.python.org/3.6/library/pdb.html)

The PDB is classed as an interactive source code debugger which can be used in a similar fashion to how you would use the REPL. 

# Starting the Python Debugger

When it comes to starting the Python debugger we have 2 main options. We can either invoke the PDB from the start of our projects execution and step through it from the beginning by calling `python3 -m pdb main.py`, or we can add `import pdb; pdb.set_trace()` above the particular section of code we wish to debug in our Python application in the same way that you would typically set breakpoints. 

For smaller programs the first option is fine but for massive Python systems I would tend to recommend going down the second route as this would execute everything up until we reach that particular section of code and then it would open up the PDB for us to work with.

# Common Commands

Becoming relatively proficient with the Python debugger requires knowledge of just a few of the many commands available. 

## Commands

These commands can be entered either as their shorthand versions `s` or there full commands `step`.

> For a full list of debugger commands have a look at the official documentation: [Debugger Commands](https://docs.python.org/3.6/library/pdb.html#debugger-commands)

* **n(ext)** - Continues execution of program until the next line is reached, or whether the current function returns. 
* **c(cont(inue))** - Continues execution of our program until it reaches the next `pdb.set_trace()`
* **r(eturn)** - Continues execution until the current function returns
* **s(tep)** - Executes the current line and stops at the first possible occasion.
* **w(here)** - Prints out a stack trace.
* **l(ist)** - Lists the source code for the current file. With no arguments this equates to the 11 lines surrounding current line. 
* **q(uit)** - Quits the current debugging session.

With these 5 commands and a combination of your standard Python functions such as `print()`, `repr()` and so on, you can effectively navigate through your Python programs and come to a decent understanding as to when and where in your program something has went wrong. 

# Example

Let's have a look at how we can use this to effectively step over a very simple Python program.

```python
def compute(x, y):
    return x + y

def main():
    print("This is my program")
    import pdb; pdb.set_trace()
    x = compute(2, 3)
    print(x)

if __name__ == '__main__':
    main()
```

We've set a breakpoint on the second line of our `main()` function. This means that when we run the above program you should see execution stops at the point where `import pdb; pdb.set_trace()` is hit and the pdb interactive command line opens up. 

```py
 $ python3.6 simple.py
This is my program
> /location/to/simple.py(7)main()
-> x = compute(2, 3)
(Pdb) 
```

The final line is where we'll be inputting our commands. Run the `n(ext)` command to go to the next line and then explore our `x` variable:

```py
(Pdb) n
> /location/to/simple.py(8)main()
-> print(x)
(Pdb) x
5
(Pdb) repr(x)
'5'
(Pdb)
```

# Conclusion

In this tutorial we covered how you can get up and running using the python debugger, the `pdb` to walk through various sections of your Python code and try to gain real insight as to what it is doing. This insight will hopefully help you make more informed decisions as to what could have went wrong within your program!

Hopefully you found this tutorial useful, if you did or you require further assistance then please let me know in the comments section below or by tweeting me : [@Elliot_F](https://twitter.com/elliot_f).