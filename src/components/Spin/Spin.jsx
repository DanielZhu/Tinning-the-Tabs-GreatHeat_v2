'use strict'

import './style.styl'

import React from 'react'

export default class Spin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='spin-wrapper'>
        <div className='spin-icon'>ICON</div>
        <div className='spin-text'>{this.props.text}</div>
      </div>
    );
  }
}
