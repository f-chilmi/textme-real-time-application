const initialState = {
  isLoading: false,
  isError: false,
  alertMsg: '',
  data: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHAT_LIST_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'CHAT_LIST_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'Failed get data'
      }
    }
    case 'CHAT_LIST_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data
      }
    }
    default: {
      return state
    }
  }
}