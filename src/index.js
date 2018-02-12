import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'//eslint-disable-line
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './views/index'

const root = document.getElementById('root')
const renderDom = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    root,
  )
}
renderDom(App)
if (module.hot) {
  module.hot.accept('./views/index', () => {
    const NextApp = require('./views/index').default//eslint-disable-line
    renderDom(NextApp)
  })
}
