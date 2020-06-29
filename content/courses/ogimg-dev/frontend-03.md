---
author: Elliot Forbes
date: 2018-06-09T22:48:26+01:00
desc: 
  In this tutorial, we are going to build our first React component and explore how we can get started using hooks
image: react.svg
series: ogimgdev
tags:
  - ogimgdev
title: Part 3 - Creating a Function Component and using Hooks
twitter: https://twitter.com/Elliot_F
video: 433728301
nextPage: /courses/ogimg-dev/frontend-04/
weight: 3
paid: false
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

In this tutorial, we are going to build our first React component and explore how we can get started using hooks.

Below you will find the full source code for the header component to help you out a little! 

```jsx
import React from 'react';

function Header() {
    const [navbarOpen, setNavbarOpen] = React.useState(false);

    return (
        <nav className="flex items-center justify-between flex-wrap p-6">
            <div className="flex items-center flex-shrink-0 text-dark-gray mr-6">
                <span className="font-semibold text-xl tracking-tight">Open Graph Image API</span>
            </div>
            
            <div className="block lg:hidden">
                <button 
                    onClick={() => setNavbarOpen(!navbarOpen)} 
                    className="flex items-center px-3 py-2 border rounded text-gray-800 border-gray-800 hover:text-gray-600 hover:border-gray-600">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className={"lg:flex flex-grow items-center" +
                    (navbarOpen ? " w-full flex": " hidden")}>
                <div className="flex flex-col lg:flex-row list-none lg:ml-auto">
                    <a href="/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-dark-gray mr-4 sm:w-auto">
                        <span role="img" aria-label="Profile">⚙️</span> Profile
                    </a>
                    <a href="/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-dark-gray mr-4 sm:w-auto">
                        <span role="img" aria-label="Sign Up">✍</span> Sign Up
                    </a>
                </div>
            </div>

        </nav>
    );
}

export default Header;
```

