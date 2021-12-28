const getUserToken = () => window.localStorage.getItem("u_id")
const setUserToken = (token) => window.localStorage.setItem("u_id", token)

const getUserName = () => window.localStorage.getItem("u_name")
const setUserName = (token) => window.localStorage.setItem("u_name", token)

const getShopToken = () => window.localStorage.getItem("s_id")
const setShopToken = (token) => window.localStorage.setItem("s_id", token)

const getShopName = () => window.localStorage.getItem("s_name")
const setShopName = (token) => window.localStorage.setItem("s_name", token)

const isShopAccount = () => !!getShopToken()

const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export {
  getUserToken,
  setUserToken,
  uuid,
  getShopToken,
  setShopToken,
  getUserName,
  setUserName,
  isShopAccount,
  getShopName,
  setShopName,
}
