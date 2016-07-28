'use strict'

import './style.styl'

import React, {Component} from 'react'
import {render} from 'react-dom'

export default class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='not-found-wrapper'>
        <div className='not-found-icon'>Not Found Icon</div>
        <div className='not-found-text'>You dial the wrong path</div>
      </div>
    );
  }
}
