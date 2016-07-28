'use strict'

// Import stylus files
import './style.styl'

// Import libs
import React, {Component, PropTypes} from 'react'
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'

import ColTinnedList from '../ColTinnedList/ColTinnedList';

// {timeAgo: {value: xx, unit: x}, tinnedList: []}
export default class ColTimeSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  transUnitForTimeAgo(timeAgo) {
    return timeAgo.label ? timeAgo.label : timeAgo.value + ' ' + timeAgo.unit + (timeAgo.value > 1 ? 's' : '');
  }
  render() {
    return (
      <div className='col-timeslot' key={this.transUnitForTimeAgo(this.props.data.timeAgo)}>
        <div className='col-timeslot-title'>{this.transUnitForTimeAgo(this.props.data.timeAgo)}</div>
        <ColTinnedList data={this.props.data.tinnedList} key={this.transUnitForTimeAgo(this.props.data.timeAgo)} />
      </div>
    );
  }
}
