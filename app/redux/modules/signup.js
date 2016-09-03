import { saveRoom } from 'helpers/api'
import auth, { logout, createFirebaseUser, saveUserToDatabase } from 'helpers/auth'
import assign from 'lodash.assign'
import { authUser } from 'redux/modules/users'

const UPDATE_SIGNUP = 'UPDATE_SIGNUP'
const SAVE_SIGNUP = 'SAVE_SIGNUP'
const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE'
const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS'
const AUTH_USER = 'AUTH_USER'

export function updateSignup (name, signup) {
    return {
        type: UPDATE_SIGNUP,
        name,
        signup
    }
}

function signupUserFailure (error) {
    return {
        type: SIGNUP_USER_FAILURE,
        error: 'Error signup user.',
    }
}

function signupUserSuccess (error) {
    return {
        type: SIGNUP_USER_SUCCESS,
        notification: 'Signup successful!',
    }
}

export function initiateSaveUser ( signup ) {
    return function (dispatch) {
        return createFirebaseUser( signup.email, signup.password1 )
            .then(() =>  saveUserToDatabase(signup))
            .then((user) => dispatch(signupUserSuccess(signup)))
            .then((user) => dispatch(authUser(user.uid)))
            .catch((error) => dispatch(signupUserFailure(error)))
    }
}

const initialState = {
    values: {}
}

export default function signup (state = initialState, action) {
    switch ( action.type ) {
        case UPDATE_SIGNUP :
            return assign({}, ...state, {
                signup: assign({}, state.signup, {
                    [action.name]: action.signup
                })
            })

        case SAVE_SIGNUP:
            return {
                requestAddUser: true,
                username: action.username,
                firstName: action.firstName,
                lastName: action.lastName,
                password: action.password,
                confirmPassword: action.confirmPassword
            }

        case SIGNUP_USER_FAILURE :
            return {
                ...state,
                error: action.error,
            }

        case SIGNUP_USER_SUCCESS :
            return {
                ...state,
                success: action.notification,
            }

        case AUTH_USER :
            return {
                ...state,
                isAuthed: true,
                authedId: action.uid,
            }

        default:
            return state
    }
}
