import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import { store } from './config/store'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { browserHistory, Router, IndexRoute, Route } from 'react-router'
// import { hashHistory } from 'react-router'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'

import * as reducers from './redux/modules'
import { checkIfAuthed } from './helpers/auth'

import {
  MainContainer, HomeContainer, AuthenticateContainer,
  LoginContainer, LogoutContainer, RoomContainer,
  ModerateContainer } from './containers'

// const history = syncHistoryWithStore(browserHistory, store)
const history = browserHistory

function checkAuth (nextState, replace) {
    const { isAuthed, isFetching } = store.getState().users

    if (isFetching === true) return

    const nextPathName = nextState.location.pathname
    if (nextPathName === '/' || nextPathName === '/auth') {
        if (isAuthed === true) replace('/login')
    } else {
        if (isAuthed !== true) replace('/auth')
    }
}

if (typeof module !== 'undefined' && module.require) {
    if (typeof require.ensure === 'undefined') {
        require.ensure = require('node-ensure') // shim for node.js
    }
}


const rootRoute = (  ) => (
    <Route path='/' component={MainContainer}>
        <Route path='moderate' component={ModerateContainer} />
        <Route path='auth' component={AuthenticateContainer} />
        <Route path='login' component={LoginContainer} />
        <Route path='rooms/:roomId' component={RoomContainer} />
        <Route path='logout' component={LogoutContainer} />
        <IndexRoute component={HomeContainer} />
    </Route>
)
//
// const rootRoute = {
//     component: MainContainer,
//     path: '/',
//     indexRoute: {
//         getComponent (location, cb) {
//             require.ensure([], () => {
//                 cb(null, require('./containers/Main/MainContainer'))
//             })
//         }
//     },
//     childRoutes: [
//         {
//             path: 'moderate',
//             getComponent (location, cb) {
//                 require.ensure([], () => {
//                     cb(null, require('./containers/Moderate/ModerateContainer'))
//                 })
//             }
//         },
//         {
//             path: 'auth',
//             getComponent (location, cb) {
//                 require.ensure([], () => {
//                     cb(null, require('./containers/Auth/AuthContainer'))
//                 })
//             }
//         },
//         {
//             path: 'login',
//             getComponent (location, cb) {
//                 require.ensure([], () => {
//                     cb(null, require('./containers/Login/LoginContainer'))
//                 })
//             }
//         },
//         {
//             path: 'rooms/:roomId',
//             getComponent (location, cb) {
//                 require.ensure([], () => {
//                     cb(null, require('./containers/Room/RoomContainer'))
//                 })
//             }
//         },
//         {
//             path: 'logout',
//             getComponent (location, cb) {
//                 require.ensure([], () => {
//                     cb(null, require('./containers/Logout/LogoutContainer'))
//                 })
//             }
//         }
//     ]
// }


const App = React.createClass({
    render () {
        return (
            <Provider store={store}>
                {/*<Router history={browserHistory} routes={rootRoute} />*/}
                <Router history={history}>
                    {rootRoute(  )}
                    {/*<Route path='/' component={MainContainer} />*/}
                </Router>
            </Provider>
        )
    }
})

App.Routes = rootRoute
App.History = browserHistory

module.exports = App
