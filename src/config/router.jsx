import React from 'react'
import {
  Route,
} from 'react-router-dom'
import Layout from '../views/manager/Layouts/layout'
import List from '../views/manager/List/index'
// import Editor from '../views/manager/Editor/index'

export default () => [
  <Route path="/index" exact component={List} />,
  <Route path="/admin" component={Layout} />,
]
