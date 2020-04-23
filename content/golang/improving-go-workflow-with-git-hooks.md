---
title: "Improving Your Go Development Workflow With Git Hooks"
date: 2019-08-02T08:05:10+01:00
desc: In this article, we are going to be taking a look at how you can improve your Go development workflow through the use of git hooks that automatically format and lint your Go code
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.png
tags:
- tools
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

Git hooks are a pretty powerful way of improving your development workflow without having to remember to run additional scripts or perform additional tasks. In this article, we are going to be taking a look at how you can define your own simple git hooks within a project repository that can automatically perform the task of linting + formating your Go code.

This fairly simple example should give you a flavour as to how you can leverage git hooks for your own devious plans.

# Real-Life Example

One example of this is from one of my current projects where the team had to encrypt secrets files before they were getting pushed to the project's repository. Encrypting the file was a simple one liner, but due to the number of encrypted files we were working with, it became a challenge to remember to encrypt every file that has been changed and more often than not we would run our project and scratch our heads whilst we tried to figure out why it wasn't picking up the new secrets.

## The Solution

When it came to attempting to solve this, we were fairly limited in the tools we could pull in and didn't want to use something that would impact the current development flow for people in the team who had their own preferences. 

This is where git hooks came into play. With hooks, I could define a simple `pre-commit` hook script that would automatically perform the task of encrypting any un-encrypted files and adding them to the commit. I could also make this an optional addon to the team's development flow by creating these hooks in a `hooks/` directory so that if they wished to add these git hooks to their workflow, they could with a simple `git config core.hooksPath hooks` command.

# Creating a Git Hook

Hooks are actually surprisingly simple to make as they are simply just bash scripts that have specific names in particular directory. When you next execute a given `git` command, it would automatically execute this bash script provided it was the rightly named file for that particular command.

If you wish to only create git hooks for your particular project on your machine, you can do so by navigating to your current project directory and then into the `.git/hooks/` directory within that project. 

If you view the contents of that directory you should see something like this:

```output
31/07/2019  22:09               478 applypatch-msg.sample
31/07/2019  22:09               896 commit-msg.sample
31/07/2019  22:09             3,327 fsmonitor-watchman.sample
31/07/2019  22:09               189 post-update.sample
31/07/2019  22:09               424 pre-applypatch.sample
31/07/2019  22:09             1,642 pre-commit.sample
31/07/2019  22:09             1,348 pre-push.sample
31/07/2019  22:09             4,898 pre-rebase.sample
31/07/2019  22:09               544 pre-receive.sample
31/07/2019  22:09             1,492 prepare-commit-msg.sample
31/07/2019  22:09             3,610 update.sample
```

Each of these contains example git hooks that you can turn on simply by renaming the files and removing the `.sample` file endings.

The file we are concerned about for the purpose of this article though is the `pre-commit` file. 

Within this same directory, let's create a new file called `pre-commit` and within this let's add the following:

```bash
#!/bin/bash

echo "Test Hook"
```

> If you are running on Mac or Linux you will have to set the executable bit for this script using `chmod`. On Windows, this
should just work straight out of the box!

```bash
chmod +x pre-commit
```

With this set, try make an empty commit to test this:

```bash
git commit --allow-empty -m "Testing Git Hook"
```

When you run this, you should now see that `"Test Hook"` is printed out just before git executes the `commit` command. 

Awesome! You have successfully created your own git hook! This will now be executed every time you commit something within this given repository. 

# Improving our Git Hook

Ok, so we have been able to successfully create our first git hook, it's now time to start improving this so that it actually performs a useful task for us other than just echo some text.

Let's start by adding some go linting to this script:

```bash
#!/bin/bash

echo "Test Hook"

# this will retrieve all of the .go files that have been 
# changed since the last commit
STAGED_GO_FILES=$(git diff --cached --name-only -- '*.go')

# we can check to see if this is empty
if [[ $STAGED_GO_FILES == "" ]]; then
    echo "No Go Files to Update"
# otherwise we can do stuff with these changed go files
else
    for file in $STAGED_GO_FILES; do
        echo $file
    done
fi
```

With this in place, try changing a `.go` file within your project and attempting a `git add -A` following by a `git commit -m "Some Message"`.

You will now see that just below our `"Test Hooks"` our `pre-commit` hook is now printing out the path to the file which has been changed.

<div class="filename"> $ git commit -m "Test Commit" </div>

```output
Test Hook
test.go
[master 82ab8c6] test
 1 file changed, 2 insertions(+)
```

Aweomse, so it's able to see that we've update a `.go` file within our project directory and we are able to echo that file out in our `for` loop. Let's extend our git hook to automatically format this file for us whenever we commit:

<div class="filename"> .git/hooks/pre-commit </div>

```bash
#!/bin/bash

echo "Test Hook"

# this will retrieve all of the .go files that have been 
# changed since the last commit
STAGED_GO_FILES=$(git diff --cached --name-only -- '*.go')

# we can check to see if this is empty
if [[ $STAGED_GO_FILES == "" ]]; then
    echo "No Go Files to Update"
# otherwise we can do stuff with these changed go files
else
    for file in $STAGED_GO_FILES; do
        # format our file
        go fmt $file
        # add any potential changes from our formatting to the 
        # commit
        git add $file
    done
fi
```

Now, when we go to save any of our files and subsequently add and then commit them, these will be automatically formatted for us 
and any changes made by the formatting will automatically be added to the given commit:

<div class="filename"> git add -A </div>

```output
C:\Projects\test>git status
On branch master

        modified:   main.go
```

<div class="filename"> git commit -m "Updates" </div>

```output
Test Hook
main.go
main.go
[master 61e6ed4] Updates
```

Awesome! We have now been able to create a git hook that automatically improves our Go development workflow and ensures that
whatever we commit is properly formatted code!

# Distributing Git Hooks Between Teams

Now, unfortunately the changes we made within the `hooks/` directory under our project's `.git/` directory will not be tracked 
and therefore getting these changes out to various different members of your team becomes a bit of a challenge. 

However, what you can do to get around this particular challenge is to create a directory called `.githooks/` within your current
project's directory and store the `pre-commit` git hook within that directory. You'll be able to commit and track this just as you
would any other files within your project and in order to turn on these enable these hooks on other development machines you 
simply need to run this command:

```output
$ git config core.hooksPath .githooks
```

Once you have executed this particular command, you should now see that whenever you try and commit something, the hooks provided
within that directory are now enabled!

# Conclusion

Awesome, so in this tutorial, we've had a look at how you can improve your Go development workflow by using git hooks in conjunction 
with existing tools such as `go fmt` to ensure that whatever you commit up to your repositories has been properly formated! 

This is just a very small taste of what you can achieve with git hooks and hopefully it gives you some ideas as to how you 
can take these further! If you have any ideas or examples as to how you have improved this workflow, then I would love to 
hear about them in the comments section below!

## Further Reading:

* [Customizing Git - Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)