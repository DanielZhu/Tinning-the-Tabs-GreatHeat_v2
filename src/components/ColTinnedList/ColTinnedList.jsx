'use strict'

// Import stylus files
import './style.styl'

// Import libs
import React, {Component, PropTypes} from 'react'
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'

import ColTinnedItem from '../ColTinnedItem/ColTinnedItem';

export default class ColTinnedList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let tinnedList = this.props.data;
    let colTinnedList = [];

    for (let tinnedItem of tinnedList) {
      colTinnedList.push(<ColTinnedItem key={tinnedItem.id} item={tinnedItem} />);
    }

    return (
      <div className='col-list-wins'>
        {colTinnedList}
      </div>
    );
  }
}
