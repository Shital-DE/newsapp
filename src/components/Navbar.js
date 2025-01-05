import React, { Component } from 'react'
import { NavLink } from "react-router-dom";

export class Navbar extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">News App</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/business">Business</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/entertainment">Entertainment</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/health">Health</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/science">Science</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/sports">Sports</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/technology">Technology</NavLink>
            </li>
            </ul>
        </div>
        </nav>
      </div>
    )
  }
}

export default Navbar
