import React from 'react'
import { hydrate, render } from 'react-dom'
import App from '../shared/App'

hydrate(<App data={window.__INITIAL_DATA__}/>, document.getElementById('root'), () => {
  // We don't need the static css any more once we have launched our application.
  const ssStyles = document.getElementById('server-side-styles')
  ssStyles.parentNode.removeChild(ssStyles)
});