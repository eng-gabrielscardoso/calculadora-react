import React, { Component } from 'react';

import './Display.css';

export default class Display extends Component {
  render () {
    return (
      <div className="display">{ this.props.value }</div>
    );
  }
}
