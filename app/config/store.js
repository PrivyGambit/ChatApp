import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
// import createSagaMiddleware from 'redux-saga'

import * as reducers from '../redux/modules'
// import { helloSaga } from '../sagas'

// const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    combineReducers({...reducers, routing: routerReducer}),
    compose(
        applyMiddleware(thunk),
        // applyMiddleware(sagaMiddleware)
        // window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
)

// sagaMiddleware.run(helloSaga)

module.exports = { store }
