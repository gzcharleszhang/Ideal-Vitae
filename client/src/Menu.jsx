import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
  NavLink,
} from "react-router-dom";
import AddData from './pages/AddData';
import DisplayData from './pages/DisplayData';
import Dashboard from './pages/Dashboard';
<<<<<<< Updated upstream
import './menu.css';
=======
import './menu.css'
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes


export default class AppMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const {
      anchorEl,
    } = this.state;
    return (
          <AppBar
            position="sticky"
            color="default"
          >
            <Toolbar>
              <div>
                <IconButton
                  color="inherit"
                  aria-label="Menu"
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                <NavLink
                  to="/dashboard"
                  component={Dashboard}
                >
                  <Button>Dashboard</Button>
                </NavLink>
                <NavLink
                  to="/addData"
                  component={AddData}
                >
                  <Button>Add Data</Button>
                </NavLink>
                <NavLink
                  to="/displayData"
                  component={DisplayData}
                >
                  <Button>Display Data</Button>
                </NavLink>
               </Menu>
              </div>
              <Typography
                variant="h6"
                color="inherit"
                className="horizontalSpace"
              >
              </Typography>
                <h1 className="newfont">
                  Build a Resume
                </h1>
              <Typography
                variant="h6"
                color="inherit"
                className="horizontalSpace"
              >
              </Typography>
              <Button
                color="inherit"
                className="newfont"

              >
                Login
              </Button>
            </Toolbar>
          </AppBar>
    )
  }
};
