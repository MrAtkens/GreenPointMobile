import axios from 'axios'
import { URL_USER } from '../settings'
import * as SecureStore from "expo-secure-store";

axios.defaults.withCredentials = true

const getSpots = async () => {
  return await axios.get(`${URL_USER}/spots`).then(response => {
    return response
  }).catch(error => {
    return error.response
  })
}

const getSpotById = async (id) => {
  return await axios.get(`${URL_USER}/spots/${id}`).then(response => {
    return response
  }).catch(error => {
    return error.response
  })
}

const getNearSpots = async (lng, lat) => {
  return await axios.get(`${URL_USER}/spots/nearest?Longitude=${lng}&Latitude=${lat}`, {headers:
        { Authorization: `Bearer ${await SecureStore.getItemAsync('jwt_token')}` }}).then(response => {
    return response
  }).catch(error => {
    return error.response
  })
}

export const spotService = {
  getSpots,
  getSpotById,
  getNearSpots
};
