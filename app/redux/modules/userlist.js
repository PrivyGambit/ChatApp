import { listenToUsersList, banUser, unBanUser } from 'helpers/api'
import { addListener } from 'redux/modules/listeners'

const REQUEST_FETCH_USERLIST = 'REQUEST_FETCH_USERLIST'
const REQUEST_FETCH_USERLIST_ERROR = 'REQUEST_FETCH_USERLIST_ERROR'
const REQUEST_FETCH_USERLIST_SUCCESS = 'REQUEST_FETCH_USERLIST_SUCCESS'
const REQUEST_BAN_USER = 'REQUEST_BAN_USER'
const REQUEST_BAN_USER_ERROR = 'REQUEST_BAN_USER_ERROR'
const REQUEST_BAN_USER_SUCCESS = 'REQUEST_BAN_USER_SUCCESS'

function requestUserList () {
    return {
        type: REQUEST_FETCH_USERLIST
    }
}

function requestUserListError (error) {
    return {
        type: REQUEST_FETCH_USERLIST_ERROR,
        error
    }
}

function requestUserListSuccess (users) {
    return {
        type: REQUEST_FETCH_USERLIST_SUCCESS,
        users
    }
}

function requestBanUser () {
    return {
        type: REQUEST_BAN_USER
    }
}

function requestBanUserSuccess (users) {
    return {
        type: REQUEST_BAN_USER_SUCCESS,
        users
    }
}

function requestBanUserError (error) {
    return {
        type: REQUEST_BAN_USER_ERROR,
        error
    }
}

export function fetchUserList () {
    return function (dispatch, getState) {
        if (getState().listeners.users === true) {
            return
        }

        dispatch(addListener('rooms'))
        dispatch(requestUserList())

        listenToUsersList( (users) => {
            dispatch(requestUserListSuccess(users))
        }, (error) => dispatch(requestUserListError(error)))
    }
}


export function callBanUser (userId) {
    return function (dispatch) {
        dispatch(requestBanUser())
        banUser (userId, ( users )=> {
            dispatch(requestBanUserSuccess(users))
        }, (error) => dispatch(requestBanUserError(error)))
    }
}

export function callUnbanUser (userId) {
    return function (dispatch) {
        dispatch(requestBanUser())
        unBanUser (userId, ( users )=> {
            dispatch(requestBanUserSuccess(users))
        }, (error) => dispatch(requestBanUserError(error)))
    }
}

const initialState = {
    isFetching: false,
    error: '',
    userlist: {}
}

export default function userlist (state = initialState, action) {
    switch ( action.type ) {
        case REQUEST_FETCH_USERLIST:
            return {
                isFetching: true,
                error: '',
                ...state
            }
        case REQUEST_FETCH_USERLIST_ERROR:
            return {
                isFetching: false,
                error: action.error
            }
        case REQUEST_FETCH_USERLIST_SUCCESS:
            return {
                isFetching: false,
                error: '',
                userlist: {
                    ...state.users,
                    ...action.users
                }
            }
        default:
            return state
    }
}
