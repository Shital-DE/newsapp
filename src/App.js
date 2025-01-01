import './App.css';
import React, { Component } from 'react'

export default class App extends Component {
  name = 'John Doe';
  render() {
    return (
      <div>
        Hello {this.name}
      </div>
    )
  }
}

