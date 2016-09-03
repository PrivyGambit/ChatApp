import { listenToChats, turnOffListener } from 'helpers/api'
import { addListener, removeListener } from 'redux/modules/listeners'

const SETTINGS_CHATS_LISTENER = 'SETTINGS_CHATS_LISTENER'
const SETTINGS_CHATS_LISTENER_ERROR = 'SETTINGS_CHATS_LISTENER_ERROR'
const SETTINGS_CHATS_LISTENER_SUCCESS = 'SETTINGS_CHATS_LISTENER_SUCCESS'
const RESET_CHATSLIST = 'RESET_CHATSLIST'
const SEARCH_CHATS = 'SEARCH_CHATS'
const CHAT_CALL_QUERY = 'CHAT_CALL_QUERY'

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

function settingChatsListenerSuccess (chats, roomId) {
    return {
        type: SETTINGS_CHATS_LISTENER_SUCCESS,
        chats,
        roomId,
    }
}

function displaySearchChats (query) {
    return {
        type: SEARCH_CHATS,
        query
    }
}

export function searchChat ( params ) {
    return function (dispatch, getState) {
        dispatch( displaySearchChats(params.query) )
    }
}

export function removeChatsListener ( roomId ) {
    return function ( dispatch, getState ) {
        dispatch(removeListener('chats'))
        turnOffListener(roomId)
        updateChats()
    }
}

export function setAndHandleChatsListener (roomId) {
    return function (dispatch, getState) {
        dispatch(addListener('chats'))
        dispatch(settingChatsListener())

        listenToChats(roomId, (chats) => {
            dispatch(settingChatsListenerSuccess(chats, roomId))
        }, (error) => dispatch(settingChatListenerError(error)))
    }
}

const initialState = {
    isFetching: true,
    error: '',
    chats: {},
    roomId: ''
}

export default function chatsList (state = initialState, action) {
    switch ( action.type ) {
        case SETTINGS_CHATS_LISTENER :
            return {
                ...state,
                isFetching: true,
            }
        case CHAT_CALL_QUERY:
            return {
                ...state,
                isFetching: true
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
                    ...action.chats,
                },
                roomId: action.roomId
            }

        case SEARCH_CHATS :
            return {
                isFetching: false,
                error: '',
                chatList: queryResult,
                query:action.query
            }

        case RESET_CHATSLIST:
            return {
                ...state,
                isFetching: false,
                error: '',
                chats: {},
                roomId: ''
            }

        default:
            return state
    }
}
