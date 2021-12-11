import React, { Component } from 'react';
import { firebaseDatabase } from '../../Firebase';
import { ref,onValue,push } from "firebase/database";

export default class Chat extends Component {
  constructor() {
    super();

    this.state = {
      messages: [],
      username: ''
    };

    this.onAddMessage = this.onAddMessage.bind(this);
  }

  componentWillMount() {
    const username = localStorage.getItem('chat_username');
    this.setState({username: username ? username : 'Unknown'})

    const chatRef = ref(firebaseDatabase, 'messages/1111');
  
    onValue(chatRef, (snapshot) => {
  
      let messagesObj = snapshot.val();
      let messages = [];
      Object.keys(messagesObj).forEach(key =>  messages.push(messagesObj[key]));
      messages = messages.map((message) => { return {text: message.text, user: message.user, id: message.key}})
      this.setState(prevState => ({
        messages: messages,
      }));
    
    });

  }

  onAddMessage(event) {
    event.preventDefault();
    const chatRef = ref(firebaseDatabase, 'messages/1111');
    push(chatRef,{text: this.input.value, user: this.state.username})
    this.input.value = '';
  }

  render() {
    return (
      <div>
        <div className="padding-13 messages-div">
            <h2>Direct Chat</h2>
            {this.state.messages.map((message) => {
             const _class = message.user === this.state.username ? 'message-left container' : 'message-right container';
            return (
                <div className={_class}>
                  <h6 className="name-heading">{message.user}</h6>
                  <p className="marg-left-10">{message.text}</p>
                  <span className="time-left"></span>
                </div>
            )
            })}
        </div>
      <div className="container textarea-div">
        <textarea className="text-area" ref={node => this.input = node}></textarea>
        <button className="btn btn-info send-btn " onClick={this.onAddMessage}>Send</button>
      </div>
    </div>
    );
  }
}
