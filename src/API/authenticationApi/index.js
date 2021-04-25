import axios from 'axios'
import { URL_USER } from '../settings'

axios.defaults.withCredentials = true

const userSingInApi = async (email, password) => {
  return await axios.post(`${URL_USER}/api/auth/SignIn`, {
    email: email,
    password: password
  }).then(response => {
    console.log(response)
    return response
  }).catch(error => {
    return error.response
  })
}

const userSingUpApi = async (email, username, password) => {
  return await axios.post(`${URL_USER}/api/auth/SignUp`, {
    email: email,
    username: username,
    password: password
  }).then(response => {
    console.log(response)
    return response
  }).catch(error => {
    return error.response
  })
}



export const authenticationService = {
  userSingInApi,
  userSingUpApi,
};
