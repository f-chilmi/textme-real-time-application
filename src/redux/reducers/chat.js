const initialState = {
  isLoading: false,
  isError: false,
  alertMsg: '',
  data: {},
  detail: {},
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
    case 'DETAIL_CHAT_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'DETAIL_CHAT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'Failed get data'
      }
    }
    case 'DETAIL_CHAT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        detail: action.payload.data
      }
    }
    default: {
      return state
    }
  }
}