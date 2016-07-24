import { listenToRooms, fetchSingleRooms } from 'helpers/api'
import { addListener } from 'redux/modules/listeners'
import { addUser } from 'redux/modules/users'

const SETTINGS_ROOMS_LISTENER = 'SETTINGS_ROOMS_LISTENER'
const SETTINGS_ROOMS_LISTENER_ERROR = 'SETTINGS_ROOMS_LISTENER_ERROR'
const SETTINGS_ROOMS_LISTENER_SUCCESS = 'SETTINGS_ROOMS_LISTENER_SUCCESS'
const ADD_ROOM = 'ADD_ROOM'

function settingRoomsListener () {
  return {
    type: SETTINGS_ROOMS_LISTENER,
  }
}

function settingRoomsListenerError (error) {
  return {
    type: SETTINGS_ROOMS_LISTENER_ERROR,
    error: 'Error fetching Rooms',
  }
}

function settingRoomsListenerSuccess (data) {
  return {
    type: SETTINGS_ROOMS_LISTENER_SUCCESS,
    data,
    timestamp: Date.now(),
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
      Object.keys(rooms).map((roomId) => dispatch(addUser(rooms[roomId].author)))
    }, (error) => dispatch(settingRoomsListenerError(error)))
  }
}

function addRoom (roomId, room) {
  return {
    type: ADD_ROOM,
    roomId,
    room,
  }
}

export function fetchAndHandleSingleRoom (roomId) {
  return function (dispatch) {
    fetchSingleRoom(roomId)
      .then((room) => dispatch(addRoom(roomId, room)))
      .catch((error) => console.warn('Error fetching room', error))
  }
}

const initialState = {
  lastUpdated: 0,
  isFetching: true,
  error: '',
  rooms: {},
}

export default function lists (state = initialState, action) {
  switch (action.type) {
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
        lastUpdated: action.timestamp || state.lastUpdated,
        isFetching: false,
        error: '',
        rooms: {
          ...state.rooms,
         ...action.data,
        },
      }
    case ADD_ROOM :
      return {
        ...state,
        isFetching: false,
        rooms: {
          ...state.rooms,
          [action.roomId]: action.room,
        },
      }
    default :
      return state
  }
}
