import React, { Component } from "react"
import { firebaseDatabase } from "../../Firebase"
import { ref, onValue, push } from "firebase/database"
import { FormLayout } from "../../components/Layouts"
import ImageUpload from "../../components/ImageUpload/ImageUpload"
import ChatItem from "./ChatItem"
import { PrimaryText } from "../../components/Typography"
import { useNavigate, useParams } from "react-router"
import {
  getCustomerToken,
  getUserName,
  getUserToken,
} from "../../utils/utility"
import { getData, postData } from "../../utils/api-helper"
import { Flex } from "reflexbox"
import backButton from './../../assets/chevronLeft.svg'
import homeButton from './../../assets/home.svg'

export default class Chat extends Component {
  isCustomer = false

  constructor() {
    super()

    this.state = {
      messages: [],
      username: getUserName(),
      userId: getUserToken(),
      customerId: getCustomerToken(),
      storeName : ""
    }

    this.isCustomer = this.state.userId != undefined

    this.onAddMessage = this.onAddMessage.bind(this)
    this.onPhotoSelected = this.onPhotoSelected.bind(this)
    this.onImageUploadSuccess = this.onImageUploadSuccess.bind(this)
    this.pushMessage = this.pushMessage.bind(this)
    this.handleImageError = this.handleImageError.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)

    console.log(
      "user " + this.state.userId + " customer " + this.state.customerId
    )
  }

  componentWillMount() {
    const chatRef = ref(firebaseDatabase, "messages/" + this.props.chatId)

    onValue(chatRef, (snapshot) => {
      let messagesObj = snapshot.val()
      let messages = []
      let storeName = ""
      if (messagesObj) {
        Object.keys(messagesObj).forEach((key) =>
          messages.push(messagesObj[key])
        )
        messages = messages.map((message) => {
          if (storeName === "") {
            storeName = message.senderName
          }
          return {
            text: message.messageText,
            user: message.senderName,
            id: message.key,
            timestamp: message.timestamp,
            urls: message.imageURLs,
            senderId: message.senderUniqueId,
          }
        })
        this.setState((prevState) => ({
          messages: messages,
          storeName: storeName
        }))
      }
    })
  }

  onAddMessage(event) {
    event.preventDefault()
    const messsage = this.input.value
    this.pushMessage(messsage, [])
    this.input.value = ""
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
      sender_name: this.state.username,
      sender_unique_id: this.state.userId
        ? this.state.userId
        : this.state.customerId,
      timestamp: Date.now(),
      conversation_id: this.props.chatId,
      message_text: textMessage,
      image_urls: uris,
      sender_type: this.isCustomer ? "CUSTOMER" : "RESOURCE",
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    postData({ url: "/chat/v0/post_chat_message", payload }, config)
      .then(({ data }) => {
        console.log("response" + data)
      })
      .catch((err) => console.log(err))
  }

  onPhotoSelected(file) {
    const url = `https://api.cloudinary.com/v1_1/dgawrw0zc/upload`

    var fileInput = document.querySelector('input[type="file"]')

    const formData = new FormData()

    formData.append("file", fileInput.files[0])
    formData.append("upload_preset", "chat_image")
    formData.append("filename_override", "random_file")

    const options = {
      method: "POST",
      body: formData,
    }

    fetch(url, options)
      .then(
        (response) => response.json(),
        (error) => alert("An error occurred upload")
      )
      .then((res) => this.onImageUploadSuccess(res.url))
  }

  onImageUploadSuccess(uploadedUrl) {
    this.pushMessage("", [uploadedUrl])
  }

  handleImageError = (e) => {
    console.log(e)
  }

  render() {
    const selfId = this.state.userId ? this.state.userId : this.state.customerId
    console.log("self id " + selfId)

    return (
      <FormLayout>
        <div
          style={{
            flex: 1,
            display: "flex",
            margin: 0,
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "#ffffff",
          }}
        >
          <div
            style={{
              overflowY: "scroll",
              height: 700,
              scrollBehavior: "smooth",
            }}
          >
           {this.getTitleHeadingView()}
            {this.state.messages.map((message) => {
              return (
                <ChatItem
                  name={message.user}
                  message={message.text}
                  timestamp={message.timestamp}
                  urls={message.urls}
                  key={message.timestamp}
                  sent={selfId == message.senderId}
                />
              )
            })}
            <div
              style={{ float: "left", clear: "both" }}
              ref={(el) => {
                this.messagesEnd = el
              }}
            ></div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: 0,
              flex: 1,
              height: 70,
              padding: 16,
              justifyContent: "left",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
            }}
          >
            <textarea
              style={{ margin: 0, flex: 1 }}
              ref={(node) => (this.input = node)}
            ></textarea>
            <div style={{ marginLeft: 16, marginRight: 16 }}>
              <ImageUpload
                name="newImage"
                onLoad={(image, file) => {
                  this.onPhotoSelected(file)
                }}
              />
            </div>
            <button onClick={this.onAddMessage} style={{ padding: 6 }}>
              Send
            </button>
          </div>
        </div>
      </FormLayout>
    )
  }

  getTitleHeading() {
    const { userId, customerId, storeName } = this.state
    if (customerId) {
      return "Chat with Customer"
    } else if (userId) {
      return storeName == "" ? "Chat with Shop" : storeName
    } else {
      return "DIrect Chat"
    }
  }

  getTitleHeadingView() {
    return (
      <Flex width={1} flexDirection="row" backgroundColor= "#edeff2" alignItems="center" justifyContent="space-between" marginBottom={16}>      
        <img src={backButton} alt="backButton" style={{marginLeft : 16, marginRight:16, padding:0, height:40, width:32}} onClick={this.onBackPress} />
        <PrimaryText
          size={20}
          style={{
            paddingTop: 16,
            paddingBottom: 16,
            marginBottom: 16,
            fontWeight: "bold",
            color:"#000000"
          }}
        >
          {this.getTitleHeading()}
          </PrimaryText>
          <img src={homeButton} alt="homeButton" style={{marginLeft : 16, marginRight:16, padding:0, height:40, width:32}} onClick={this.isCustomer ? this.onHomePress : this.onBackPress} />

      </Flex>
    )
  }

  onBackPress = () => {
    this.props.navigate("/chats")
  }

  onHomePress = () => {
    this.props.navigate("/")
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" })
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }
}

export const WrappedComponent = (props) => {
  const { chatId } = useParams()
  const navigate = useNavigate()
  return <Chat chatId={chatId} navigate={(s) => navigate(s)}/>
}
