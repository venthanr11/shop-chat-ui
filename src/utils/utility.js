const getUserToken = () => window.localStorage.getItem("u_id")
const setUserToken = (token) => window.localStorage.setItem("u_id", token)

const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function isImageUrl(text){return text.contains('res.cloudinary.com')}

export { getUserToken, setUserToken, uuid, isImageUrl }
