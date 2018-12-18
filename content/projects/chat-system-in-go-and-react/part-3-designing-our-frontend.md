---
author: Elliot Forbes
date: 2018-03-19T11:05:52Z
desc: 'In this series, we are going to be building a Chat App in Go and ReactJS'
image: golang.png
series:
- goreactchat
tags:
- golang
title: Part 3 - Designing our Frontend
twitter: https://twitter.com/Elliot_F
---

> **Note -** This post is part 3 of a series on building a chat application in Go with ReactJS. You can find part 2 here - [Part 2 - Simple Communication](/projects/chat-system-in-go-and-react/part-2-simple-communication/)

In this part of the series, we're going to be looking at improving our frontend and fleshing out the application so that it looks and feels like a decent online chat application. 

By the end of this part of the series, you should have a really solid looking frontend which looks a little something like this:

![Chat Application Screenshot](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/chat-app-go-react/screenshot-01.png)


# Component Based Approach

In React, as well as all other popular frontend frameworks, we tend to divide our applications down into a series of components. Each component typically represents an element on the application such as, say, a list of users within our application, or the chat history section. 

This component-based approach has a lot of benefits and effectively allows larger teams to work on individual components without necessarily impacting other teams also working on the application. These components provide you with a certain *separation of concerns* and effectively, it allows you to build up your app through composition and keep your directory structure logically grouped.

# A Header Component

So, let's start off by creating a really simple `Header` component. We'll do this by creating a new directory under `frontend/src/` called `components/` and within this we'll create a `Header/` directory which will house all of our files for our Header component.

```s
- src/
- - components/
- - - Header/
- - - - Header.jsx
- - - - index.js
- - - - Header.scss
```

> **Note -** Going forward, whenever we create a new component, we'll create a new directory for it within our `components/` directory and we'll typically be creating those three files within that directory. 

## Header.jsx

Let's implement our `function component` within our `Header.jsx` file. This will simply render our a header for our site with a simple title:

```jsx
import React from 'react';
import './Header.scss';

const Header = () => (
  <div className='header'>
    <h2>Realtime Chat App</h2>
  </div>
);

export default Header;

```

## Header.scss

Next, we'll want to give it some styling. ReactJS projects don't automatically come with the ability to handle `scss` files, so we'll first need to install `node-sass` by running the following within our `frontend/` directory:

```s
$ yarn add node-sass
```

And, once this has completed, we can then add our styles like so:

```css
.header {
  background-color: #15223b;
  width: 100%;
  margin: 0;
  padding: 10px;
  color: white;

  h2 {
    margin: 0;
    padding: 0;
  }

}
```

## index.js

Finally, we'll want to export our `Header` component so that other components within our application can subsequently import it and render it within their own `render()` function:

```js
import Header from './header.jsx'

export default Header;
```

## Updating our App.js

Now that we've created our new `Header` component, let's try and import it into our `App.js` component and then display it by adding it to our `render()` function like so:

```jsx
// App.js
// Import our new component from it's relative path
import Header from './components/Header/Header';
// ...
render() {
  return (
    <div className="App">
      <Header />
      <button onClick={this.send}>Hit</button>  
    </div>
  );
}
```

Upon saving, our frontend application should recompile and we should see our new `Header` component successfully render at the top of our browser page.

> **Congratulations** - You have successfully just created your first React component!

# A Chat History Component

Ok, so, we've managed to build and render a really simple component, so let's build some more and get a bit more comfortable. 

In this section, we are going to be creating a Chat History component which will display any and all messages that we receive from our WebSocket server. 

Once again, we'll be creating a new folder within our `components/` directory, but this time we'll call is `ChatHistory/`. Once we've created this directory, let's create the three files for our component.

## ChatHistory.jsx

Let's start off with our `ChatHistory.jsx` file. This time, it's going to be slightly more complex as we are going to be building a `Class` component as opposed to the `Function` component that we used for our `Header` component above.

> **Note -** We can define class components using an `ES6 class`. If you want to learn more about the difference, I recommend you check out the official documentation here: [Function and Class Components](https://reactjs.org/docs/components-and-props.html#function-and-class-components)

Within this `Component`, you'll notice we have a `render()` function. The `render()` function does the job of returning the `jsx` that we wish to render in our application for this particular component.

This component will take in an `array` of chat messages from our `App.js` function through its' `props` and will subsequently render them one under the other.

```jsx
import React, { Component } from 'react';
import './ChatHistory.scss';

class ChatHistory extends Component {
  render() {
    const messages = this.props.chatHistory.map((msg, index) => <p key={index}>{msg.data}</p>);

    return (
      <div className='ChatHistory'>
        <h2>Chat History</h2>
        {messages}
      </div>
    );
  };

}

export default ChatHistory;
```

## ChatHistory.scss

Let's add a little style to our `ChatHistory` component in our `ChatHistory.scss` file, this is just a simple background color change and some updates to padding and margin:

```css
.ChatHistory {
  background-color: #f7f7f7;
  margin: 0;
  padding: 20px;
  h2 {
    margin: 0;
    padding: 0;
  }
}
```

## Index.js

And finally, we need to export our new component, just like we did our `Header` component, so that it can be imported within our `App.js` and rendered:

```js
import ChatHistory from './ChatHistory.jsx'

export default ChatHistory;
```

## App.js and api/index.js Updates

So, now that we have our `ChatHistory` component, we need to actually feed it some messages. 

In the previous part of this series, we set up two way communication that echoes back whatever is sent to it, so we technically have a simple source of new messages whenever we hit our `send message` button within our app.

Let's update our `api/index.js` file and update our `connect()` function so that it triggers a callback whenever it receives a new message from our WebSocket connection:

```js
let connect = (cb) => {
  console.log("connecting")

  socket.onopen = () => {
    console.log("Successfully Connected");
  }
  
  socket.onmessage = (msg) => {
    console.log(msg);
    cb(msg);
  }

  socket.onclose = (event) => {
    console.log("Socket Closed Connection: ", event)
  }

  socket.onerror = (error) => {
    console.log("Socket Error: ", error)
  }
};
```

So, we've added a `cb` parameter to our function. This `cb` will be called on `line 10` whenever we receive our message.

Once we've made these changes, we can update our `App.js` to add this callback function and update our state using `setState` whenever we do get a new message.

We're going to move our `connect()` call from our `constructor` into a `componentDidMount()` function which will be called automatically as part of our Components life-cycle.

```js
// App.js
  componentDidMount() {
    connect((msg) => {
      console.log("New Message")
      this.setState(prevState => ({
        chatHistory: [...this.state.chatHistory, msg]
      }))
      console.log(this.state);
    });
  }
```

We'll then want to update our `render()` function and display our `ChatHistory` component:

```jsx
render() {
  return (
    <div className="App">
      <Header />
      <ChatHistory chatHistory={this.state.chatHistory} />
      <button onClick={this.send}>Hit</button>  
    </div>
  );
}
```

When we compile and run both our `frontend` and `backend`, we should see that whenever we hit the `send message` button on our frontend, it continues to send a message across our WebSocket connection to our backend, our backend then echoes it back to the frontend and it's rendered successfully within our `ChatHistory` component!

![Chat Application Screenshot](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/chat-app-go-react/screenshot-01.png)

# Conclusion

So, we've managed to successfully improve our frontend application and see it coming together as a chat application. In the next part of the series, we are going to be focusing on the following:

* Improving our Frontend to add a new send message component to allow us to send custom messages back to the server
* Improving our Backend to handle multiple clients and cross-client communication. 

Check out the next part of this series here: [Part 4 - Handling Multiple Clients](/projects/chat-system-in-go-and-react/part-4-handling-multiple-clients/)

> **Enjoying This Series?** - If you are enjoying this series, or have any feedback, I would love to hear it on twitter and see your progress in the form of screenshots! - [@Elliot_f](https://twitter.com/elliot_f). 