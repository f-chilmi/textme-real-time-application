import io from 'socket.io-client'
import {API_URL} from '@env'
// const API_URL = 'http://127.0.0.1:8080'
console.log(API_URL)

const socket = io(API_URL)

export default socket