import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'

import * as reducers from '../redux/modules'

const store = createStore(
    combineReducers({...reducers, routing: routerReducer}),
    compose(
        applyMiddleware(thunk),
        process.env.NODE_ENV !== "production" ? window.devToolsExtension() : (f) => f
    )
)

module.exports = { store }
