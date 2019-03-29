import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
  HashRouter,
  Route
} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="pageBackground">
        <div className="horizontalSpace">
          <AppBar position="static">
            <Toolbar>
              <IconButton color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className="horizontalSpace">
                Simple Resumes
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </div>
        <HashRouter>
          <div>
            <Route path = "/login" component = {Login}/>
            <Route path = "/register" component = {Register}/>
            <Route path = "/dashboard" component = {Dashboard}/>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
