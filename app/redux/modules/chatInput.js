import { saveChat, uploadFile } from 'helpers/api'

const UPDATE_CHAT_TEXT = 'UPDATE_CHAT_TEXT';
const UPDATE_QUOTE = 'UPDATE_QUOTE';

export function updateChatText ( chatText, quote ) {
  return {
    type: UPDATE_CHAT_TEXT,
    chatText,
    quote
  }
}

export function updateQuote ( chatText, quote ) {
  return {
    type: UPDATE_QUOTE,
    chatText,
    quote
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
  chatText: '',
  quote: ''
}

export default function chatInput (state = initialState, action) {
  switch ( action.type ) {
    case UPDATE_CHAT_TEXT :
      return {
        ...state,
        chatText: action.chatText,
        quote: action.quote
      }
    case UPDATE_QUOTE :
      return {
        ...state,
        chatText: action.chatText,
        quote: action.quote
      }

    default:
      return state
  }
}
