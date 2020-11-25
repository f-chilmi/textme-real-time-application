const initialState = {
  isLoading: false,
  isLogin: false,
  isError: false,
  token: '',
  alertMsg: '',
  phone: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PHONE': {
      return {
        ...state,
        phone: action.payload.phone
      }
    }
    case 'AUTH_USER_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'AUTH_USER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'Login failed'
      }
    }
    case 'AUTH_USER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isLogin: true,
        token: action.payload.data.token
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isLogin: false,
        token: '',
        alertMsg: 'Logout successfully'
      }
    }
    default: {
      return state
    }
  }
}