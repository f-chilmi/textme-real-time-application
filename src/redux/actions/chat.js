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
  privateChat: (token, id_sender, id_receiver) => ({
    type: 'DETAIL_CHAT',
    payload: http(token).get(`/message/${id_sender}/${id_receiver}`)
  })
}