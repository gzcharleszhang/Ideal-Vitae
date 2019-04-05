import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dashboard from './pages/Dashboard';
import AddEntry from './pages/AddEntry';
import {
  NavLink,
} from "react-router-dom";
import './menu.css'

class AppMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    anchorEl: null,
  };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div>
        <IconButton color="inherit" aria-label="Menu"
                    aria-haspopup="true"
                    onClick={this.handleClick}>
          <MenuIcon />
        </IconButton>
        <Menu
         id="simple-menu"
         anchorEl={anchorEl}
         open={Boolean(anchorEl)}
         onClose={this.handleClose}
       >
         <NavLink to="/dashboard" component={Dashboard}><MenuItem>Dashboard</MenuItem></NavLink>
        <NavLink to="/addEntry" component={AddEntry}> <MenuItem>Add Entry</MenuItem></NavLink>
       </Menu>

      </div>
    )
  }
};

export default AppMenu;
