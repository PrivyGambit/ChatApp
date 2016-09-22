import { listenToRooms } from '../../helpers/api'
import { addListener } from './listeners'

const SETTINGS_ROOMS_LISTENER = 'SETTINGS_ROOMS_LISTENER'
const SETTINGS_ROOMS_LISTENER_ERROR = 'SETTINGS_ROOMS_LISTENER_ERROR'
const SETTINGS_ROOMS_LISTENER_SUCCESS = 'SETTINGS_ROOMS_LISTENER_SUCCESS'
const UPDATE_ROOM_NAME = 'UPDATE_ROOM_NAME';

function settingRoomsListener () {
    return {
        type: SETTINGS_ROOMS_LISTENER,
    }
}

function settingRoomsListenerError (error) {
    return {
        type: SETTINGS_ROOMS_LISTENER_ERROR,
        error
    }
}

function settingRoomsListenerSuccess (rooms) {
    return {
        type: SETTINGS_ROOMS_LISTENER_SUCCESS,
        rooms,
    }
}

export function setAndHandleRoomsListener () {
    return function (dispatch, getState) {
        if (getState().listeners.rooms === true) {
            return
        }

        dispatch(addListener('rooms'))
        dispatch(settingRoomsListener())

        listenToRooms((rooms) => {
            dispatch(settingRoomsListenerSuccess(rooms))
        }, (error) => dispatch(settingRoomsListenerError(error)))
    }
}

const initialState = {
    isFetching: true,
    error: '',
    rooms: {},
}

export default function rooms (state = initialState, action) {
    switch ( action.type ) {
        case SETTINGS_ROOMS_LISTENER :
            return {
                ...state,
                isFetching: true,
            }
        case SETTINGS_ROOMS_LISTENER_ERROR :
            return {
                ...state,
                isFetching: false,
                error: action.error,
            }
        case SETTINGS_ROOMS_LISTENER_SUCCESS :
            return {
                ...state,
                isFetching: false,
                error: '',
                rooms: {
                    ...state.rooms,
                    ...action.rooms,
                },
            }
        default:
            return state
    }
}
