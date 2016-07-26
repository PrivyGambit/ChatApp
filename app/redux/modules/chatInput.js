import { saveChat, uploadFile } from 'helpers/api'

const UPDATE_CHAT_TEXT = 'UPDATE_CHAT_TEXT';

export function updateChatText (chatText) {
  return {
    type: UPDATE_CHAT_TEXT,
    chatText
  }
}

export function initiateSaveChat ( chat, roomId ) {
  return function (dispatch) {
    saveChat( chat, roomId )
      .catch((error) => console.warn('Error saving chat', error))
  }
}

export function initiateUploadFile ( file, chat, roomId ) {
  return function ( dispatch ) {
    uploadFile ( file, chat, roomId )
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
