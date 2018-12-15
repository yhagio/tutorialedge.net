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

Let's start off by creating a new `component` within our `frontend/` React project. This component will encapsulate all of the logic behind taking a users' text input and then sending it off to our WebSocket endpoint to then be broadcast to others.

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

```js
import ChatInput from './ChatInput.jsx'

export default ChatInput;
```

## Updating our App.js

```js
send(event) {
  if(event.keyCode === 13) {
    sendMsg(event.target.value);
    event.target.value = "";
  }
}
```

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

## Trying it out

# Improving Our Chat History Component

So, right now, we've got a fairly ugly, but functional chat history which displays every message being broadcast from the WebSocket server out to our connected client.

This message is just displayed as is, in JSON format, with no additional styling around it, so let's have a look at improving this now by creating another component called that we'll call our `Message` component.

## Our Message Component

```jsx
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

```js
import Message from './Message.jsx'

export default Message;
```

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


# Conclusion

So, 

> **Enjoying This Series?** - If you are enjoying this series, or have any feedback, I would love to hear it on twitter and see your progress in the form of screenshots! - [@Elliot_f](https://twitter.com/elliot_f). 