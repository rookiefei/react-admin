/*
应用的跟组件
*/
import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Login from './pages/login/login'
import admin from './pages/admin/admin'

export default class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch> {/* 只匹配下列 Route 之一 */}
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}