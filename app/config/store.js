import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'

import * as reducers from '../redux/modules'

const store = createStore(
    combineReducers({...reducers, routing: routerReducer}),
    compose(
        applyMiddleware(thunk),
        // window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
)


module.exports = { store }
