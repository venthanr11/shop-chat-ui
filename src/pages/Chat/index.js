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
    this.setState({username: username ? username : 'Mukesh'})

    const chatRef = ref(firebaseDatabase, 'messages/1111');
  
    onValue(chatRef, (snapshot) => {
  
      let messagesObj = snapshot.val();
      let messages = [];
      if(messagesObj) {
        Object.keys(messagesObj).forEach(key =>  messages.push(messagesObj[key]));
        messages = messages.map((message) => { return {text: message.text, user: message.user, id: message.key}})
        this.setState(prevState => ({
          messages: messages,
        }));
      }
    
    });

  }

  onAddMessage(event) {
    event.preventDefault();
    const chatRef = ref(firebaseDatabase, 'messages/1111');
    push(chatRef,{text: this.input.value, user: this.state.username}, function(error) {
      if (error) {
        alert("Data could not be saved." + error);
      } else {
        alert("Data saved successfully.");
      }
    })
    this.input.value = '';
  }

  render() {
    return (
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', flexDirection : "column", margin: 100}}>
        <div >
            <h2>Chat with Crossword</h2>
            {this.state.messages.map((message) => {
             const _class = message.user === this.state.username ? 'message-left container' : 'message-right container';
            return (

                <div style={{ background: "#f0d5d3" , width : 280, padding: 2, margin : 24, borderRadius: 16}}>
                  <h6 style={{color:"##292626", marginLeft: 8, marginBottom: 4, marginTop:12}}>{message.user}</h6>
                  <p style={{color:"##292626", marginLeft: 16, marginTop: 0, marginBottom:12}} >{message.text}</p>
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
