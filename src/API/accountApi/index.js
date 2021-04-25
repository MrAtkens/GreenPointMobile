import axios from 'axios'
import { URL_USER } from '../settings'
import * as SecureStore from 'expo-secure-store';

axios.defaults.withCredentials = true

const userEditUserNameApi = async (userName) => {
  return await axios.patch(`${URL_USER}/user`, {
    username: userName,
  }, {headers:
        { Authorization: `Bearer ${await SecureStore.getItemAsync('jwt_token')}` }}).then(response => {
    return response
  }).catch(error => {
    return error.response
  })
}

const userEditPasswordApi = async (password) => {
  return await axios.patch(`${URL_USER}/user`, {
    password: password,
  }, {headers:
        { Authorization: `Bearer ${await SecureStore.getItemAsync('jwt_token')}` }}).then(response => {
    return response
  }).catch(error => {
    return error.response
  })
}


const userGetData = async () => {
  console.log(await SecureStore.getItemAsync('jwt_token'));
  return await axios.get(`${URL_USER}/user`, {headers:
        { Authorization: `Bearer ${await SecureStore.getItemAsync('jwt_token')}` }}).then(response => {
    return response
  }).catch(error => {
    return error.response
  })
}

const likeComment = async (spotId, commentId) => {
  console.log(spotId)
  console.log(commentId)
  return await axios.post(`${URL_USER}/spots/${spotId}/comments/${commentId}/likes`, {},{headers:
        { Authorization: `Bearer ${await SecureStore.getItemAsync('jwt_token')}` }}).then(response => {
    console.log(response)
    return response
  }).catch(error => {
    return error.response
  })
}



export const accountService = {
  userEditUserNameApi,
  userEditPasswordApi,
  userGetData,
  likeComment
};
