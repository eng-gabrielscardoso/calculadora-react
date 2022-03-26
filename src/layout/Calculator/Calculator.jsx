import React, { Component } from 'react';

import './Calculator.css';

import Button from '../../components/Button/Button';
import Display from '../../components/Display/Display';

const _initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = { ..._initialState };

  constructor (props) {
    super(props);
    this.addDigit = this.addDigit.bind(this);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
  }

  addDigit (digit) {
    if (digit === '.' && this.state.displayValue.includes('.')) {
      return;
    }

    let clearDisplay = this.state.displayValue === '0'
      || this.state.clearDisplay;

    let currentValue = clearDisplay ? '' : this.state.displayValue;

    let displayValue = currentValue + digit;

    this.setState({ displayValue, clearDisplay: false });

    if (digit != '.') {
      let i = this.state.current;
      let newValue = parseFloat(displayValue);
      let values = [ ...this.state.values ];

      values[i] = newValue;
      
      this.setState({ values });
    }
  }

  clearMemory () {
    this.setState({ ..._initialState });
  }

  setOperation (operation) {
    if (this.state.current === 0) {
      this.setState({ 
        operation, 
        current: 1, 
        clearDisplay: true 
      });
    } else {
      let equals = operation === '=';
      let currentOperation = this.state.operation;

      let values = [ ...this.state.values ];
      
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;

      this.setState({ 
        displayValue: values[0], 
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      });
    }
  }

  render () {

    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
