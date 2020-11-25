const initialState = {
  isLoading: false,
  isError: false,
  alertMsg: '',
  data: {},
  allUser: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
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
        data: action.payload.data
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
    default: {
      return state
    }
  }
}