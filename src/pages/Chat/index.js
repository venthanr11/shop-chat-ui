import React, { Component } from 'react';
import { firebaseDatabase } from '../../Firebase';
import { ref,onValue,push } from "firebase/database";
import { FormLayout } from '../../components/Layouts';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import ChatItem from './ChatItem';
import { PrimaryText } from '../../components/Typography';
import { useParams } from 'react-router';
import { getUserToken } from '../../utils/utility'
import { postData } from '../../utils/api-helper'


 export default class Chat extends Component {

  constructor() {
    super();

    this.state = {
      messages: [],
      username: '',
      userId: getUserToken()
    };

    this.onAddMessage = this.onAddMessage.bind(this);
    this.onPhotoSelected = this.onPhotoSelected.bind(this)
    this.onImageUploadSuccess = this.onImageUploadSuccess.bind(this)
    this.pushMessage = this.pushMessage.bind(this)
    this.handleImageError = this.handleImageError.bind(this)

  }

  componentWillMount() {
    const username = localStorage.getItem('chat_username');
    this.setState({username: username ? username : 'Mukesh'})

    const chatRef = ref(firebaseDatabase, 'messages/' + this.props.chatId);
  
    onValue(chatRef, (snapshot) => {
  
      let messagesObj = snapshot.val();
      let messages = [];
      if(messagesObj) {
        Object.keys(messagesObj).forEach(key =>  messages.push(messagesObj[key]));
        messages = messages.map((message) => { return {text: message.messageText, user: message.senderName, id: message.key, timestamp : message.timestamp, urls : message.imageURLs, senderId : message.senderId}})
        this.setState(prevState => ({
          messages: messages,
        }));
      }
    
    });

  }

  onAddMessage(event) {
    event.preventDefault();
    const messsage = this.input.value;
    this.pushMessage(messsage,[])
    this.input.value = '';
  }


  pushMessage(textMessage, uris) {
    // const chatRef = ref(firebaseDatabase, 'messages/' + this.props.chatId);
    // push(chatRef,{messageText : textMessage, senderName: this.state.username, timestamp:  Date.now(), imageURLs : uris}, function(error) {
    //   if (error) {
    //     alert("Data could not be saved." + error);
    //   } else {
    //     alert("Data saved successfully.");
    //   }
    // })

    const payload = {
      unique_customer_id: getUserToken(),
      senderName: this.state.username,
      sender_id : this.state.userId,
      timestamp: Date.now(),
      conversation_id: this.props.chatId,
      message_text:textMessage,
      image_urls:uris
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    postData({ url: "/chat/v0/post_chat_message", payload }, config).then(
      ({ data }) => {console.log("response" + data)}
    ).catch(err => console.log(err))

  }

onPhotoSelected(file) {

  const url = `https://api.cloudinary.com/v1_1/dgawrw0zc/upload`;

  var fileInput = document.querySelector('input[type="file"]');

  const formData = new FormData();

  formData.append('file', fileInput.files[0]);
  formData.append('upload_preset' , 'chat_image')
  formData.append('filename_override',"random_file")

    const options = {
      method: 'POST',
      body: formData,
    };
    
    fetch(url, options)
    .then(
      response => response.json(),
      error => alert('An error occurred upload')
    )
    .then(res =>
      this.onImageUploadSuccess(res.url
    )
    )
}

onImageUploadSuccess(uploadedUrl) {
  this.pushMessage("",[uploadedUrl])
}

handleImageError = e => { 
  console.log(e)
}


  render() {
    const {userId} = this.state
  
    return (
      <FormLayout>
      <div style={{flex: 1, display: 'flex', margin:0, justifyContent:'center', flexDirection : "column",  backgroundColor:"#f2f7f5"}}>
        <div style={{overflowY: 'scroll', height:700, scrollBehavior:'smooth'}} >
            <PrimaryText size={20} style={{paddingTop:16, paddingBottom: 16,marginBottom:16, fontWeight: 'bold',  backgroundColor: '#FFFFFF'}}>Direct Chat</PrimaryText>
            {this.state.messages.map((message) => {
          
            return (
                  <ChatItem  name= {message.user} message = {message.text} timestamp = {message.timestamp} urls = {message.urls} key={message.timestamp} sent = {userId == message.senderId}/>
                )
            })}
        </div>

      <div style={{display: 'flex', flexDirection:'row', margin:0, flex:1, height:70, padding: 16, justifyContent:'left', alignItems:'center', backgroundColor: '#FFFFFF'}}>
        <textarea style={{ margin:0, flex:1}} ref={node => this.input = node}></textarea>
        <div style={{marginLeft:16, marginRight:16}}>
        <ImageUpload
          name="newImage"
          onLoad={(image, file) => {
            this.onPhotoSelected(file)
          }}
      />
      </div>
        <button onClick={this.onAddMessage} style={{padding:6}}>Send</button>
      </div>
    </div>
    </FormLayout>
    );
  }
}


export const WrappedComponent = props => {
  const { chatId } = useParams()
return <Chat chatId = {chatId} />
}
