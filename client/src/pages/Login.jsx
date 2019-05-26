import React, { Component } from 'react';
import {
  Redirect
} from "react-router-dom";
import axios from 'axios';
import LoginForm from './authenticationComponents/LoginForm';
import './form.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div
        className="formContainer"
      >
        <LoginForm />
      </div>
    );
  };
};
