import { saveRoom } from 'helpers/api'

const UPDATE_ROOM_NAME = 'UPDATE_ROOM_NAME';

export function updateRoomName (roomName) {
    return {
        type: UPDATE_ROOM_NAME,
        roomName
    }
}

export function initiateSaveRoom ( roomName ) {
    return function (dispatch) {
        saveRoom( roomName )
            .catch((error) => console.warn('Error saving room', error))
    }
}

const initialState = {
    roomName: ''
}

export default function roomInput (state = initialState, action) {
    switch ( action.type ) {
        case UPDATE_ROOM_NAME :
            return {
                ...state,
                roomName: action.roomName
            }

        default:
            return state
    }
}
