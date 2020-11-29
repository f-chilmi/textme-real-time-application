const initialState = {
  isLoading: false,
  isError: false,
  alertMsg: '',
  data: {},
  detail: {},
  chatSent: {},
  user1: {},
  user2: {},
  pageInfo: {},
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
        detail: {},
        chatSent: {},
        user1: {},
        user2: {},
        pageInfo: {},
      }
    }
    case 'DELETE': {
      return {
        ...state,
        detail: {},
        user1: {},
        user2: {},
      }
    }
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
        data: action.payload.data.chat.rows,
        pageInfo: action.payload.data.pageInfo,
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
        detail: action.payload.data.chat,
        user1: action.payload.data.user1,
        user2: action.payload.data.user2,
      }
    }
    case 'SEND_CHAT_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'SEND_CHAT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'Failed get data'
      }
    }
    case 'SEND_CHAT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        detail: action.payload.data.private
      }
    }
    default: {
      return state
    }
  }
}