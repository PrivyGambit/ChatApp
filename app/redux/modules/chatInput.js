import { saveChat } from 'helpers/api'

const UPDATE_CHAT_TEXT = 'UPDATE_CHAT_TEXT';

export function updateChatText (chatText) {
  return {
    type: UPDATE_CHAT_TEXT,
    chatText
  }
}

export function initiateSaveChat ( chatText, roomId ) {
  return function (dispatch) {
    saveChat( chatText, roomId )
      .catch((error) => console.warn('Error saving chat', error))
  }
}

const initialState = {
  chatText: ''
}

export default function chatInput (state = initialState, action) {
  switch ( action.type ) {
    case UPDATE_CHAT_TEXT :
      return {
        ...state,
        chatText: action.chatText
      }

    default:
      return state
  }
}
