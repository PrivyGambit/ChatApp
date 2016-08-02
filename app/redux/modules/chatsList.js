import { listenToChats, turnOffListener } from 'helpers/api'
import { addListener } from 'redux/modules/listeners'

const SETTINGS_CHATS_LISTENER = 'SETTINGS_CHATS_LISTENER'
const SETTINGS_CHATS_LISTENER_ERROR = 'SETTINGS_CHATS_LISTENER_ERROR'
const SETTINGS_CHATS_LISTENER_SUCCESS = 'SETTINGS_CHATS_LISTENER_SUCCESS'
const RESET_CHATSLIST = 'RESET_CHATSLIST'

function settingChatsListener () {
  return {
    type: SETTINGS_CHATS_LISTENER,
  }
}

function settingChatListenerError (error) {
  return {
    type: SETTINGS_CHATS_LISTENER_ERROR,
    error: 'Error fetching Chats',
  }
}

export function updateChats(data=[]) {
  return {
    type: RESET_CHATSLIST,
    data
  }
}

function settingChatsListenerSuccess (chats) {
  return {
    type: SETTINGS_CHATS_LISTENER_SUCCESS,
    chats,
  }
}

export function setAndHandleChatsListener (roomId) {
  return function (dispatch, getState) {
    // if (getState().listeners.chats === true) {
    //   return
    // }

    dispatch(addListener('chats'))
    dispatch(settingChatsListener())

    listenToChats(roomId, (chats) => {
      dispatch(settingChatsListenerSuccess(chats))
    }, (error) => dispatch(settingChatListenerError(error)))
  }
}

const initialState = {
  isFetching: true,
  error: '',
  chats: {},
}

export default function chatsList (state = initialState, action) {
  switch ( action.type ) {
    case SETTINGS_CHATS_LISTENER :
      return {
        ...state,
        isFetching: true,
      }
    case SETTINGS_CHATS_LISTENER_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case SETTINGS_CHATS_LISTENER_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        chats: {
          ...state.chats,
          ...action.chats,
        },
      }

    case RESET_CHATSLIST:
      return {
        ...state,
        isFetching: false,
        erro: '',
        chats: {}
      }

    default:
      return state
  }
}
