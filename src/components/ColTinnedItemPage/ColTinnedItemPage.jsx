'use strict'

// Import stylus files
import './style.styl'

// Import libs
import React, {Component, PropTypes} from 'react'
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'

export default class ColTinnedItemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let pageData = this.props.page;

    return (
      <li className="tinned-item-favicon"><img src={pageData.favIconUrl} title={pageData.title} /></li>
    );
  }
}
