import auth, { signInUser } from '../../helpers/auth'
import assign from 'lodash.assign'
import { authUser, logoutAndUnauth } from './users'

const UPDATE_SIGNIN = 'UPDATE_SIGNIN'
const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE'
const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS'
const AUTH_USER = 'AUTH_USER'

export function updateSignIn (name, signIn) {
    return {
        type: UPDATE_SIGNIN,
        name,
        signIn
    }
}

function signInUserFailure (error) {
    return {
        type: SIGNIN_USER_FAILURE,
        error: 'Error Sign in user.',
    }
}

function signInUserSuccess (error) {
    return {
        type: SIGNIN_USER_SUCCESS,
        notification: 'Sign in successful!',
    }
}

const initialState = {
    values: {}
}

export function initiateSignInUser ( signIn ) {
    return function ( dispatch ) {
        return signInUser ( signIn )
            .then(( user ) => dispatch( signInUserSuccess( signIn ) ))
            .then(( user ) => dispatch(authUser( user.uid )))
            .catch((error) => dispatch( signInUserFailure( error )))
    }
}

export default function signin (state = initialState, action) {
    switch ( action.type ) {
        case UPDATE_SIGNIN :
            return assign({}, ...state, {
                signIn: assign({}, state.signIn, {
                    [action.name]: action.signIn
                })
            })

        case SIGNIN_USER_FAILURE :
            return {
                ...state,
                error: action.error,
            }

        case SIGNIN_USER_SUCCESS :
            return {
                ...state,
                success: action.notification,
            }

        // case AUTH_USER :
        //     return {
        //         ...state,
        //         isAuthed: true,
        //         authedId: action.uid,
        //     }

        default:
            return state
    }
}
