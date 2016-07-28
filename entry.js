import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Redirect, IndexRoute, Link, hashHistory} from 'react-router'

// Common Components
import Spin from './src/components/Spin/Spin'
import Col from './src/components/Col/Col'
import NotFound from './src/components/NotFound/NotFound'
import App from './src/components/App/App'

render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Col} />
      <Route path='options' component={App} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
), document.getElementById('tinning-app'));



