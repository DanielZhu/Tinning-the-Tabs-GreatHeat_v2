'use strict'

// Import stylus files
import './style.styl'

// Import libs
import React, {Component, PropTypes} from 'react'
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'

import ColTinnedItemPage from '../ColTinnedItemPage/ColTinnedItemPage'

export default class ColTinnedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    };
  }
  autoAdjustTitleInput(e) {
    console.log(e.target.innerText);
  }
  render() {
    let item = this.state.item;
    let tabList = item.tabs.map((tab, i) => {
      return (
        <ColTinnedItemPage key={tab.id} page={tab} />
      )
    });

    return (
      <div className='col-tab-list'>
        <div className="content">
          <div contentEditable="true" className="title-input" onKeyUp={this.autoAdjustTitleInput} title={item.diyTitle}>{item.diyTitle}</div>
          <div className="icon-wrapper">
            <ul className="tinned-item">
              {tabList}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
