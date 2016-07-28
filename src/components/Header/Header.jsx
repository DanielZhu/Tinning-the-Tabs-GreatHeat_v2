'use strict'

// Import stylus files
import './style.styl'

// Import libs
import React, {Component, PropTypes} from 'react'
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'

export default class TrelloHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  render() {
    return (
      <div className='header'>
        <div className='left-toolbar'>
          <div className='list-type-present'>
            <div className='icon-btn'>
              <img src='../../../src/assets/icons/list-type-thumb.png'></img>
            </div>
            <div className='icon-btn'>
              <img src='../../../src/assets/icons/list-type-text.png'></img>
            </div>
          </div>
        </div>
        <Link to='#/' className='logo'>Trello</Link>
        <div className='right-toolbar'>
          <div className='btn tin-btn'>
            <span className='label'>Tin Tabs</span>
          </div>
        </div>
      </div>
    );
  }
}
