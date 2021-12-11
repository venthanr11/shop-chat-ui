import axios from "axios"

const apiHost = "http://localhost:9002/api"

const getData = ({ url }) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${apiHost}${url}`)
      .then(({ data }) => {
        resolve(data)
      })
      .catch(reject)
  })

const postData = ({ url, payload }, config) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${apiHost}${url}`, payload, config)
      .then(({ data }) => resolve(data))
      .catch(reject)
  })

export { getData, postData }
