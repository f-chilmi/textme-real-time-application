import http from '../../helpers/http'
import qs from 'querystring'

export default {
  getUser: (token) => ({
    type: 'PROFILE_USER',
    payload: http(token).get('/users')
  }),
  getAllUser: (token) => ({
    type: 'ALL_PROFILE',
    payload: http(token).get('/users/all')
  }),
  editUser: (token, data) => ({
    type: 'EDIT',
    payload: http(token).patch('/users', qs.stringify(data))
  }),
  editPicture: (token, data) => ({
    type: 'EDIT',
    payload: http(token).patch('/users', data)
  })
}