//UI HACKED FROM https://github.com/LingyuCoder/react-calculator
import React, { Component } from 'react';
import ResultPanel from './ResultWindow';
import ButtonPanel from './ButtonPanel';
import execute from './solver';

export default class App extends Component {
    constructor() {
      super();
      this.state = {
        last: '',
        cur: '0'
      };
      this.onButtonClick = this.onButtonClick.bind(this);
    }
    onButtonClick(type) {
      //String manipulation based on symbol
      switch (type) {
      case 'c':
        this.setState({
          last: '',
          cur: '0'
        });
        break;
      case 'back':
        this.setState({
          cur: this.state.cur === '0' ? this.state.cur : this.state.cur.slice(0, -1) || '0'
        });
        break;
      case '=':
        try {
          this.setState({
            last: this.state.cur + '=',
            cur: execute(this.state.cur) + ''
          });
        } catch (e) {
          this.setState({
            last: this.state.cur + '=',
            cur: 'NaN'
          });
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
      case '^':
          this.setState({
            cur: this.state.cur + ' ' + type + ' '
          });
        break;
      case '(':
      case ')':
        this.setState({
          cur: this.state.cur === '0' ? type + ' ' : this.state.cur + ' ' + type + ' '
        });
        break;
      case '.':
        if (this.state.cur.slice(-1) !== '.') {
          this.setState({
            cur: this.state.cur + type
          });
        }
        break;
      case 'sin':
      case 'cos':
      case 'tan':
        this.setState({
          cur: this.state.cur === '0' ? type + ' (' : this.state.cur + ' ' + type + ' ('
        });
        break;
      case 'neg':
          if(this.state.cur.lastIndexOf(' ') != -1)
            this.setState({
              cur: this.state.cur.slice(0, this.state.cur.lastIndexOf(' ')) + '-' + this.state.cur.slice(this.state.cur.lastIndexOf(' ') + 1, str.length - 1)
            });
          break;
      default:
        this.setState({
          cur: this.state.cur === '0' ? type : this.state.cur + type
        });
        break;
      }
    }
  render() {
    var exp = {
      cur: this.state.cur,
      last: this.state.last
    };
    return (
      <div className="react-calculator">
        <ResultPanel exp={exp}/>
        <ButtonPanel onClick={this.onButtonClick}/>
      </div>
    );
  }
}
