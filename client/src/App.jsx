import React, { Component } from 'react';
import AppMenu from './Menu'
import {
  HashRouter,
  Route,
} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddData from './pages/AddData';
import DisplayData from './pages/DisplayData';



export default class App extends Component {
  render() {
    return (
      <div
        className="pageBackground"
      >
        <HashRouter>
          <AppMenu />
          <div>
            <Route
              path="/login"
              component={Login}
            />
            <Route
              path="/register"
              component={Register}
            />
            <Route
              path="/addData"
              component={AddData}
            />
            <Route
              path="/dashboard"
              component={Dashboard}
            />
            <Route
              path="/displayData"
              component={DisplayData}
            />
          </div>
        </HashRouter>
      </div>
    )
  }
};
