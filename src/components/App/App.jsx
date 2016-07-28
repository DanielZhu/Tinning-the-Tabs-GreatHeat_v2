import './style.styl'

import React from 'react'
import Header from '../Header/Header'

export default class App extends React.Component {
  render() {
    return (
      <div className='app-wrapper'>
        <Header></Header>
        {this.props.children || "Something wrong"}
      </div>
    );
  }
}
