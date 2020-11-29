import http from '../../helpers/http'
import qs from 'querystring'

export default {
  auth: (data) => ({
    type: 'AUTH_USER',
    payload: http().post('/auth/register', qs.stringify(data))
  }),
  getChat: (token) => ({
    type: 'CHAT_LIST',
    payload: http(token).get('/message')
  }),
  nextPrevChat: (token, url) => ({
    type: 'CHAT_LIST',
    payload: http(token).get(`${url}`)
  }),
  searchChat: (token, search) => ({
    type: 'CHAT_LIST',
    payload: http(token).get(`/message?search=${search}`)
  }),
  privateChat: (token, id_sender, id_receiver) => ({
    type: 'DETAIL_CHAT',
    payload: http(token).get(`/message/${id_sender}/${id_receiver}`)
  }),
  sendChat: (token, dataSend) => ({
    type: 'SEND_CHAT',
    payload: http(token).post('/message', qs.stringify(dataSend))
  }),
  deleteData: () => ({
    type: 'DELETE'
  })
}