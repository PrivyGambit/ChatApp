import _ from 'lodash'
import { listenToChats, turnOffListener, deleteChat, searchChats } from '../../helpers/api'
import { addListener, removeListener } from './listeners'

const SETTINGS_LOAD_NEW_CHATS_LISTENER = 'SETTINGS_LOAD_NEW_CHATS_LISTENER'
const SETTINGS_CHATS_LISTENER = 'SETTINGS_CHATS_LISTENER'
const SETTINGS_CHATS_LISTENER_ERROR = 'SETTINGS_CHATS_LISTENER_ERROR'
const SETTINGS_CHATS_LISTENER_SUCCESS = 'SETTINGS_CHATS_LISTENER_SUCCESS'
const RESET_CHATSLIST = 'RESET_CHATSLIST'
const SEARCH_CHATS = 'SEARCH_CHATS'
const CHAT_CALL_QUERY = 'CHAT_CALL_QUERY'
const DELETE_CHAT_REQUEST = 'DELETE_CHAT_REQUEST'
const DELETE_CHAT_SUCCESS = 'DELETE_CHAT_SUCCESS'
const DELETE_CHAT_ERROR = 'DELETE_CHAT_ERROR'
const SETTINGS_SEARCH_CHATS_LISTENER = 'SETTINGS_SEARCH_CHATS_LISTENER'

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

function settingsLoadNewChatsListener () {
    return {
        type: SETTINGS_LOAD_NEW_CHATS_LISTENER
    }
}

function displaySearchChats (query) {
    return {
        type: SEARCH_CHATS,
        query
    }
}

function settingsSearchChatsListener () {
    return {
        type: SETTINGS_SEARCH_CHATS_LISTENER,
    }
}

function deleteChatRequest () {
    return {
        type: DELETE_CHAT_REQUEST,
    }
}

function deleteChatRequestError (error) {
    return {
        type: DELETE_CHAT_ERROR,
        error
    }
}

function deleteChatSuccess () {
    return {
        type: DELETE_CHAT_SUCCESS
    }
}

export function removeChatsListener ( roomId ) {
    return function ( dispatch, getState ) {
        dispatch(removeListener('chats'))
        turnOffListener(roomId)
        updateChats()
    }
}

export function setAndHandleChatsListener ( roomId ) {
    return function (dispatch, getState) {
        dispatch(addListener('chats'))
        dispatch(settingChatsListener())
        handleListenToChats( roomId, dispatch )
    }
}

export function handleLoadNewChats ( roomId ) {
    return function ( dispatch, getState ) {
        dispatch(addListener('chats'))
        dispatch(settingsLoadNewChatsListener())
        let chatCount = Object.keys( getState().chatsList.chats ).length + 5
        handleListenToChats( chatCount, roomId, dispatch )
    }
}

export function handleSearchChats ( roomId, query ) {
    return function ( dispatch, getState ) {
        dispatch(settingsSearchChatsListener())
        let currChats = getState().chatsList.chats
        let queryResult = []

        Object.keys( currChats ).map(( chat ) => {
            if ( currChats[chat].type == 'text' ) {
                if ( currChats[chat].content.toLocaleLowerCase().indexOf(query) !=-1 ) {
                    queryResult.push(currChats[chat])
                }
            }
        })

        if ( !_.isEmpty( queryResult ) ) {
            dispatch(settingChatsListenerSuccess(queryResult, roomId))
        } else {
            dispatch(settingChatListenerError('Invalid Query.'))
        }
    }
}

export function requestDeleteChat ( roomId, chatId ) {
    return function ( dispatch, getState ) {

        dispatch(deleteChatRequest())

        deleteChat(roomId, chatId, (chats) => {
            dispatch(deleteChatSuccess())
        }, (error) => dispatch(deleteChatRequestError(error)))
    }
}

const handleListenToChats = ( roomId, dispatch ) => {
    return listenToChats( roomId,  (chats) => {
        dispatch(settingChatsListenerSuccess(chats, roomId))
    }, (error) => dispatch(settingChatListenerError(error)))
}

const initialState = {
    isFetching: true,
    error: '',
    chats: {},
    roomId: ''
}

export default function chatsList (state = initialState, action) {
    switch ( action.type ) {
        case DELETE_CHAT_ERROR :
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        case DELETE_CHAT_REQUEST :
            return {
                ...state,
                isDeleting: true
            }
        case DELETE_CHAT_SUCCESS:
            return {
                ...state,
                isDeleting: false,
                chats: {
                    ...action.chats,
                }
            }
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

        case SETTINGS_LOAD_NEW_CHATS_LISTENER :
            return {
                ...state,
                isFetching: true,
            }

        default:
            return state
    }
}
