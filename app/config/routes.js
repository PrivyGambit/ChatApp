import React from 'react'
import { Router, IndexRoute, Route } from 'react-router'
import {
  MainContainer, HomeContainer, AuthenticateContainer,
  LoginContainer, LogoutContainer, RoomContainer,
  ModerateContainer } from 'containers'

export default function getRoutes (checkAuth, history) {
    return (
        <Router history={history}>
            <Router path='/' component={MainContainer}>
            <Route path='moderate' component={ModerateContainer} onEnter={checkAuth}/>
            <Route path='auth' component={AuthenticateContainer} onEnter={checkAuth}/>
            <Route path='login' component={LoginContainer} onEnter={checkAuth}/>
            <Route path='rooms/:roomId' component={RoomContainer} onEnter={checkAuth} />
            <Route path='logout' component={LogoutContainer} />
            <IndexRoute component={HomeContainer} />
            </Router>
        </Router>
    )
}
