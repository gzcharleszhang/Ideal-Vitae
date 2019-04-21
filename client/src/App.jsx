import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppMenu from './Menu'
import {
  HashRouter,
  Route,
} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddEntry from './pages/AddEntry';



export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <div
          className="pageBackground"
        >
          <div
            className="horizontalSpace"
          >
        {/* Move the function a menu app bar*/}
            <AppBar
              position="static"
            >
              <Toolbar>
                <AppMenu />
                <Typography
                  variant="h6"
                  color="inherit"
                  className="horizontalSpace"
                >
                  Simple Resumes
                </Typography>
                <Button
                  color="inherit"
                >
                  Login
                </Button>
              </Toolbar>
            </AppBar>
          </div>
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
              path="/addEntry"
              component={AddEntry}
            />
            <Route
              path="/dashboard"
              component={Dashboard}
            />
          </div>
        </div>
      </HashRouter>
    );
  }
}
