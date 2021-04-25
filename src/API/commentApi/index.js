import axios from 'axios'
import { URL_USER } from '../settings'
import * as SecureStore from "expo-secure-store";

axios.defaults.withCredentials = true

const getCommentById = async (id) => {
  return await axios.get(`${URL_USER}/api/spots/${id}/comments`).then(response => {
    return response
  }).catch(error => {
    return error.response
  })
}

const addComment = async (id, text, longitude, latitude) => {
  return await axios.post(`${URL_USER}/api/spots/${id}/comments`, {
    text: text,
    longitude: longitude,
    latitude: latitude
  }).then(response => {
    return response
  }).catch(error => {
    return error.response
  })
}

const getComments = async () => {
  return await axios.get(`${URL_USER}/api/comments`, {headers:
        { Authorization: `Bearer ${await SecureStore.getItemAsync('jwt_token')}` }}).then(response => {
    return response
  }).catch(error => {
    return error.response
  })
}

const deleteComments = async (id) => {
  return await axios.delete(`${URL_USER}/api/comments/${id}`).then(response => {
    return response
  }).catch(error => {
    return error.response
  })
}


export const commentService = {
  getCommentById,
  addComment,
  getComments,
  deleteComments
};
