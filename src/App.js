import React, { Component } from 'react';
import './App.css';

class Display extends Component {
  render() {
    return (
      <p className="display">
        {this.props.value}
      </p>
    );
  }
}

function Clear(props) {
  return (
    <button className="clear" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Button(props) {
  return (
    <button className="button" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: [""]
    };
  }

  clickButton(i) {
    const display = this.state.display.slice();
    
    if (i === "=") {
      var result;
      try {
        result = (parseFloat(eval(display.replace(/\u2212/gi,"-").replace(/\xF7/gi,"/").replace(/\xD7/gi,"*")).toFixed(12))).toString().replace(/-/gi,"\u2212");
      }
      catch(err) {
        result = "Error";
      }
      this.setState({
        display: result,
      });
    } else if ("0123456789\u2212+\xD7.\xF7".includes(i)) {
      this.setState({
        display: display + i,
      });
    }
  }

  clickClear() {
    this.setState({
      display: "",
    });
  }
  
  renderDisplay(i) {
    return (
      <Display
        value={i}
      />
    );
  }

  renderClear(i) {  
    return (
      <Clear
        value={i}
        onClick={() => this.clickClear()}
      />
    );
  }
  
  renderButton(i) {
    return (
       <Button
              value={i}
              onClick={() => this.clickButton(i)}
      />
    );
  }

  render() {
    const status = this.state.display;
    
    return (
      <div className="calculator">
        <div className="calc-row">
          {this.renderDisplay(status)}
        </div>
        <div className="calc-row">
          {this.renderClear("Clear")}
        </div>
        <div className="calc-row">
          {this.renderButton("7")}
          {this.renderButton("8")}
          {this.renderButton("9")}
          {this.renderButton("\xF7")}
        </div>
        <div className="calc-row">
          {this.renderButton("4")}
          {this.renderButton("5")}
          {this.renderButton("6")}
          {this.renderButton("\xD7")}
        </div>
        <div className="calc-row">
          {this.renderButton("1")}
          {this.renderButton("2")}
          {this.renderButton("3")}
          {this.renderButton("\u2212")}
        </div>
        <div className="calc-row">
          {this.renderButton("0")}
          {this.renderButton(".")}
          {this.renderButton("=")}
          {this.renderButton("+")}
        </div>
      </div>
    );
  }
}

export default Calculator;
