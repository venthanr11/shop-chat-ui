import axios from "axios"

const apiHost = "http://ec2-15-207-111-0.ap-south-1.compute.amazonaws.com:8080/api"

const getData = ({ url }) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${apiHost}${url}`, { data: {} })
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
