import React, { Component } from "react"
import { firebaseDatabase } from "../../Firebase"
import { ref, onValue, push } from "firebase/database"
import { FormLayout } from "../../components/Layouts"
import ImageUpload from "../../components/ImageUpload/ImageUpload"
import ChatItem from "./ChatItem"
import { PrimaryText } from "../../components/Typography"
import { useNavigate, useParams } from "react-router"
import {
  getCustomerName,
} from "../../utils/utility"
import { getData, postData } from "../../utils/api-helper"
import { Flex } from "reflexbox"

export default class Chat extends Component {

  isCustomer = false

  constructor() {
    super()

    this.state = {
      messages: [],
      username: getCustomerName(),
      senderName : "",
      senderThumbnail : ""
    }

    this.onAddMessage = this.onAddMessage.bind(this)
    this.onPhotoSelected = this.onPhotoSelected.bind(this)
    this.onImageUploadSuccess = this.onImageUploadSuccess.bind(this)
    this.pushMessage = this.pushMessage.bind(this)
    this.handleImageError = this.handleImageError.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
    this.getShopDetails = this.getShopDetails.bind(this)
    this.getCustomerDetails = this.getCustomerDetails.bind(this)
    this.getSenderId = this.getSenderId.bind(this)

  }

  componentWillMount() {

    const chatRef = ref(firebaseDatabase, "messages/" + this.props.chatId)
    const selfUUID = this.getSenderId()

    if (this.props.shopId) {
      this.isCustomer = false 
    } else if (this.props.customerId) {
      this.isCustomer = true 
    }

    onValue(chatRef, (snapshot) => {
      let messagesObj = snapshot.val()
      let messages = []
      let userIdSender = ""
      if (messagesObj) {
        Object.keys(messagesObj).forEach((key) =>
          messages.push(messagesObj[key])
        )
        messages = messages.map((message) => {
          if (message.senderUniqueId != selfUUID) {
            userIdSender = message.senderUniqueId
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
        }))
        if (userIdSender && userIdSender != "") {
          if (this.isCustomer) {
            this.getCustomerDetails(userIdSender)
          } else {
            this.getShopDetails(userIdSender)
          }
        }
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
    const payload = {
      sender_name: this.state.username,
      sender_unique_id: this.getSenderId(),
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

  getCustomerDetails(uuid) {
      getData({
        url: `/customer/v0/${uuid}`,
      })
        .then(({ data }) => {
          this.setState((prevState) => ({
            senderName: data.name
          }))
        })
        .catch((err) => console.log(err))
  }

  getShopDetails(uuid) {
    getData({
      url: `/resource/v0/resource_profile/${uuid}`,
    })
      .then(({ data }) => {
        if (data.resource) {
          this.setState((prevState) => ({
            senderName: data.resource.name,
            senderThumbnail : data.resource.imgUrl  
            // || "https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online.jpg"
          }))
        }
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

  getSenderId() {
    return this.props.customerId ? this.props.customerId : this.props.shopId
  }

  render() {
    const selfId = this.getSenderId()

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
           {this.getTitleHeadingView()}
          <div
            style={{
              overflowY: "scroll",
              height: 700,
              scrollBehavior: "smooth",
            }}
          >
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
    const {senderName } = this.state
    if (senderName) {
      return  senderName
    }else {
      return "DIrect Chat"
    }
  }

  getTitleHeadingView() {
    const {senderThumbnail} = this.state
    return (
      <Flex width={1} flexDirection="row" backgroundColor= "#edeff2" alignItems="center" justifyContent="space-between" marginBottom={16}>      
        <img src={'/assets/images/chevronLeft.svg'} alt="backButton" style={{marginLeft : 16, marginRight:16, padding:0, height:40, width:32}} onClick={this.onBackPress} />
        <Flex style={{flex:1, flexDirection:"row", alignItems:"center", paddingTop:20,paddingBottom:20, markerStart:16, justifyContent:"start"}}>
        {senderThumbnail && <img src={senderThumbnail}  style={{ height:40, width:40, alignSelf:"center", marginRight:8}}/>}
        <PrimaryText
          size={16}
          style={{
            fontWeight: "bold",
            color:"#000000"
          }}
        >
          {this.getTitleHeading()}
          </PrimaryText>
          </Flex>
          <img src={'/assets/images/home.svg'} alt="homeButton" style={{marginLeft : 16, marginRight:16, padding:0, height:40, width:32}} onClick={this.isCustomer ? this.onHomePress : this.onBackPress} />

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
  const { chatId,shopId,customerId } = useParams()
  const navigate = useNavigate()
  return <Chat chatId={chatId} shopId={shopId} customerId={customerId} navigate={(s) => navigate(s)}/>
}
