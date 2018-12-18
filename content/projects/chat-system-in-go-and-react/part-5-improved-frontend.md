---
author: Elliot Forbes
date: 2018-03-19T11:05:52Z
desc: 'In this series, we are going to be building a Chat App in Go and ReactJS'
image: golang.png
series:
- goreactchat
tags:
- golang
title: Part 5 - Improving the Frontend
twitter: https://twitter.com/Elliot_F
---

> **Note -** This post is part 5 of a series on building a chat application in Go with ReactJS. You can find part 4 here - [Part 4 - Handling Multiple Clients](/projects/chat-system-in-go-and-react/part-4-handling-multiple-clients/)

Welcome to the 5th part of this series! If you've made it this far then I sincerely hope you are enjoying learning new Go concepts and building up your own chat system in Go and React!

In this part of the series, we are going to be focusing on the frontend once again, and improving it so that you can enter your own chat messages and so that any new chat messages are displayed in a nicer fashion than they are currently.

So, let's dive in!

# A Chat Input Component

Let's start off by creating a new `component` within our `frontend/` React project. This component will essentially just render an `<input/>` and then listen for any `onKeyDown` events. When a key press is registered whilst the focus is within the `<input/>` element, it will trigger whatever function we'll pass to this component later on.

```jsx
import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  
  render() {
    return (
      <div className='ChatInput'>
        <input onKeyDown={this.props.send}/>
      </div>
    );
  };

}

export default ChatInput;
```

We'll then define a bit of styling for our new input component. This will be fairly simple for now: 

```css
.ChatInput {
  width: 95%;
  display: block;
  margin: auto;

  input {
    padding: 10px;
    margin: 0;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    border: 1px solid rgba(0,0,0,0.1);
    width: 98%;
    box-shadow: 0 5px 15px -5px rgba(0,0,0,.1);
  }
}
```

With our component and our styles defined, we just need to export it.

```js
import ChatInput from './ChatInput.jsx'

export default ChatInput;
```

## Updating our App.js

Ok, so we've created our `ChatInput` component, we can update our `App.js` component so that it uses this newly created component and pass in the already defined `send()` function to said component.

```jsx
render() {
  return (
    <div className="App">
      <Header />
      <ChatHistory chatHistory={this.state.chatHistory} />
      <ChatInput send={this.send} />
    </div>
  );
}
```

We've passed in the defined `send()` function, which for now simply sends a simple `"Hello"` to our WebSocket endpoint. Let's update this now so that it takes in the context for the event that triggered it. 

By passing in this `event`, we'll be able to query if the key pressed was the `Enter` key, if it is, we'll be able to send the value of our `<input/>` field to our WebSocket endpoint and then subsequently clear that `<input/>`:

```js
send(event) {
  if(event.keyCode === 13) {
    sendMsg(event.target.value);
    event.target.value = "";
  }
}
```

## Trying it out

Now that we've created our `ChatInput` component, we can test it out. Run your Go WebSocket server and your frontend, try sending some custom messages and see if everything works as expected.

# Improving Our Chat History Component

So, right now, we've got a fairly ugly, but functional chat history which displays every message being broadcast from the WebSocket server out to our connected client.

This message is just displayed as is, in JSON format, with no additional styling around it, so let's have a look at improving this now by creating another component called that we'll call our `Message` component.

## Our Message Component

Let's start off by defining our `Message.jsx` file. This component is going to take in the message it needs to display through a `prop`. It'll then parse this `prop` called `message` and store it in the components `state` which we can then use within our `render` function.

```jsx
// src/components/Message/Message.jsx
import React, { Component } from 'react';
import './Message.scss';

class Message extends Component {
  constructor(props) {
    super(props);
    let temp = JSON.parse(this.props.message);
    this.state = {
      message: temp
    }
  }
  
  render() {
    return (
      <div className='Message'>
        {this.state.message.body}
      </div>
    );
  };

}

export default Message;
```

And, as always, we'll need to define an `index.js` file to make it visible throughout the rest of our project:

```js
// src/components/Message/index.js
import Message from './Message.jsx'

export default Message;
```

Now, on to our component's styling. This will be fairly rudimentary and just display the message in a box for now with some `box-shadow` set to make it stand out and give our chat a bit of visual depth.

```css
.Message {
  display: block;
  background-color: white;
  margin: 10px auto;
  box-shadow: 0 5px 15px -5px rgba(0,0,0,.2);
  padding: 10px 20px;
  border-radius: 5px;
  clear:both;

  &.me {
    color: white;
    float: right;
    background-color: #328ec4;
  }
}
```

## Updating our Chat History Component

Now that we've created this `Message` component, we can start using this within our `ChatHistory` component. In order to do this, we'll need to update our `render()` function like so:

```jsx
render() {
  console.log(this.props.chatHistory);
  const messages = this.props.chatHistory.map(msg => <Message message={msg.data} />);

  return (
    <div className='ChatHistory'>
      <h2>Chat History</h2>
      {messages}
    </div>
  );
};
```

On `line 3`, you'll see we've updated our `.map` function to return a `<Message />` component with the message `prop` set to our `msg.data`. This will subsequently pass in the JSON string to every message component and it will then be able to parse and render that, as it wishes.

If we save everything, we should then see that, whenever we receive a new message from our WebSocket endpoint, it renders nicely within our `ChatHistory` component!

![Chat Application Screenshot](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/chat-app-go-react/screenshot-02.png)

# Conclusion

So, in this tutorial, we improved upon our existing frontend design and implemented the ability to send custom messages back to our backend WebSocket server. 

Check out the next part of this series here: [Part 6 - Docker-izing your Backend](/projects/chat-system-in-go-and-react/part-6-dockerizing-your-backend/)

> **Enjoying This Series?** - If you are enjoying this series, or have any feedback, I would love to hear it on twitter and see your progress in the form of screenshots! - [@Elliot_f](https://twitter.com/elliot_f). 