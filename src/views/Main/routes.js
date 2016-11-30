import React from 'react'
import {Route, IndexRedirect} from 'react-router'
import Container from './Container'
import Home from './Home/Home'
import Login from './Login/Login'

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home}/>
      <Route path="login" component={Login} />
    </Route>
  )
}

export default makeMainRoutes
