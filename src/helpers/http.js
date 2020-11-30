import {default as axios} from 'axios';
// import {API_URL} from '@env';

const API_URL = 'http://127.0.0.1:8080'
console.log(API_URL)

const http = (token = null) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined
    },
  });
};

export default http;