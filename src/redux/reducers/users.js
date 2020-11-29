const initialState = {
  isLoading: false,
  isError: false,
  alertMsg: '',
  data: {},
  allUser: {},
  dataPatch: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGOUT': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        alertMsg: '',
        data: {},
        allUser: {},
        dataPatch: {},
      }
    }
    case 'PROFILE_USER_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'PROFILE_USER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'Failed get data'
      }
    }
    case 'PROFILE_USER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.result
      }
    }
    case 'ALL_PROFILE_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'ALL_PROFILE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'Failed get data'
      }
    }
    case 'ALL_PROFILE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        allUser: action.payload.data
      }
    }
    case 'EDIT_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'EDIT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'Failed update user'
      }
    }
    case 'EDIT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.dataUser
      }
    }
    default: {
      return state
    }
  }
}