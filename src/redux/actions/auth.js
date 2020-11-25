import http from '../../helpers/http'
import qs from 'querystring'

export default {
  auth: (data) => ({
    type: 'AUTH_USER',
    payload: http().post('/auth/register', qs.stringify(data))
  }),
  setPhone: (data) => ({
    type: 'SET_PHONE',
    payload: data
  }),
  logout: () => ({
    type: 'LOGOUT',
  }),
}