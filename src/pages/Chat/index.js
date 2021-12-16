import React, { Component } from 'react';
import { firebaseDatabase } from '../../Firebase';
import { ref,onValue,push } from "firebase/database";
import { FormLayout } from '../../components/Layouts';
import ImageUpload from '../../components/ImageUpload/ImageUpload';

export default class Chat extends Component {
  constructor() {
    super();

    this.state = {
      messages: [],
      username: ''
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
    const messsage = this.input.value;
    this.pushMessage(messsage)
    this.input.value = '';
  }


  pushMessage(textMessage) {
    const chatRef = ref(firebaseDatabase, 'messages/1111');
    push(chatRef,{text : textMessage, user: this.state.username}, function(error) {
      if (error) {
        alert("Data could not be saved." + error);
      } else {
        alert("Data saved successfully.");
      }
    })
  }


//   onPhotoSelected(files) {
//     const url = `https://api.cloudinary.com/v1_1/dgawrw0zc/upload`;

//     for (let file of files) {
//         const fileName = file.name;
//         request.post(url)
//             .field('upload_preset', "chat_files")
//             .field('file', file)
//             .on('progress', (progress) => this.onPhotoUploadProgress(photoId, file.name, progress))
//             .end((error, response) => {
//               alert(error + "")
//                 this.onPhotoUploaded(photoId, fileName, response);
//             });
//     }
// }

// onPhotoUploadProgress(id, fileName, progress) {
//   console.log("onPhotoUploadProgress" + progress)
// }

// onPhotoUploaded(id, fileName, response) {
//   console.log("onPhotoUploaded" + response)

// }

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
      this.onImageUploadSuccess(JSON.stringify(res.url)
    )
    )
}

onImageUploadSuccess(uploadedUrl) {
  this.pushMessage(uploadedUrl)
}

isImageUrl(text){
  return text && text.includes('res.cloudinary.com')
}

handleImageError = e => { 
  console.log(e)
}


  render() {
  
    return (
      <FormLayout>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', flexDirection : "column", margin: 16}}>
        <div style={{overflowY: 'scroll', height:700, scrollBehavior:'smooth'}} >
            <h2>Chat with Crossword</h2>
            {this.state.messages.map((message) => {
             const _class = message.user === this.state.username ? 'message-left container' : 'message-right container';
            return (

                <div style={{ background: "#f0d5d3" , width : 280, padding: 2, margin : 24, borderRadius: 16}}>
                  <h6 style={{color:"##292626", marginLeft: 8, marginBottom: 4, marginTop:12}}>{message.user}</h6>


                { !this.isImageUrl(message.text) && <p style={{color:"##292626", marginLeft: 16, marginTop: 0, marginBottom:12}} >{message.text}</p>}
                { this.isImageUrl(message.text) && <img src={message.text}  style={{height: 160, width:160}} onError={this.handleImageError}/>}
                </div>
            )
            })}
        </div>
      <div style={{display: 'flex', flexDirection:'row', margin:0, flex:1, width: 300, height:100, padding: 16}}>
        <textarea style={{ margin:0, width: 600}} ref={node => this.input = node}></textarea>
        <ImageUpload
          style={{width: 12, height: 12, margin: 0, padding:0}}
          name="newImage"
          onLoad={(image, file) => {
                        this.onPhotoSelected(file)
          }}
      />
        <button style={{ margin:0}} onClick={this.onAddMessage}>Send</button>
      </div>
    </div>
    </FormLayout>
    );
  }
}
