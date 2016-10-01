import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// import { browserHistory } from 'react-router'
import { hashHistory } from 'react-router'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'

import * as reducers from 'redux/modules'
import { checkIfAuthed } from 'helpers/auth'

const store = createStore(
    combineReducers({...reducers, routing: routerReducer}),
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
)

const history = syncHistoryWithStore(browserHistory, store)

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

function checkModerate (nextState, replace) {
    const { type } = store.getState().users
    if ( type !== 'moderate' ) replace('/login')
}

const rootRoute = (  ) => (
    <Route path='/' component={MainContainer}>
        <Route path='moderate' component={ModerateContainer} onEnter={ checkModerate }/>
        <Route path='auth' component={AuthenticateContainer} onEnter={ checkAuth }/>
        <Route path='login' component={LoginContainer} onEnter={ checkAuth }/>
        <Route path='rooms/:roomId' component={RoomContainer} onEnter={ checkAuth }/>
        <Route path='logout' component={LogoutContainer} />
        <IndexRoute component={HomeContainer} onEnter={ checkAuth }/>
    </Route>
)

const App = ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {rootRoute()}
        </Router>
    </Provider>,
    document.getElementById('app')
)

module.exports = App
