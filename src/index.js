import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './index.jsx'//eslint-disable-line
const root = document.body
const renderDom = (Component) => {
  ReactDom.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    root,
  )
}
renderDom(App)
if (module.hot) {
  module.hot.accept('./index.jsx', () => {
    const NextApp = require('./index.jsx').default//eslint-disable-line
    renderDom(NextApp)
  })
}
