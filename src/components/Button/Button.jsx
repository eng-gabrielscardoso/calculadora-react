import React, { Component } from 'react';

import './Button.css';

export default class Button extends Component {
  render () {
    return (
      <button className={`
        button
        ${this.props.operation ? 'operation' : ''}
        ${this.props.double ? 'double' : ''}
        ${this.props.triple ? 'triple' : ''}
      `}
      onClick={() => this.props && this.props.click(this.props.label)}
      >
        { this.props.label }
      </button>
    );
  }
}
