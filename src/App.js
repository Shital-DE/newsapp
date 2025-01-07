import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Routes, Route, BrowserRouter } from "react-router-dom";

export default class App extends Component {
  pgSize = 9;
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
             <Route exact path="/" element={
              <News key="general"  pageSize={this.pgSize} country="us" category="general"/>
             } /> 
            <Route exact path="/business" element={
              <News key="business"  pageSize={this.pgSize} country="us" category="business"/>
             } /> 
            <Route exact path="/entertainment" element={
              <News key="entertainment" pageSize={this.pgSize} country="us" category="entertainment"/>
             } /> 
            <Route exact path="/health" element={
              <News key="health" pageSize={this.pgSize} country="us" category="health"/>
             } /> 
            <Route exact path="/science" element={
              <News key="science" pageSize={this.pgSize} country="us" category="science"/>
             } /> 
            <Route exact path="/sports" element={
              <News key="sports" pageSize={this.pgSize} country="us" category="sports"/>
             } /> 
            <Route exact path="/technology" element={
              <News key="technology" pageSize={this.pgSize} country="us" category="technology"/>
             } /> 
          </Routes>
        </BrowserRouter>
      </div>
      
    )
  }
}

