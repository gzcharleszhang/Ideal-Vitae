import React, { Component } from 'react';
import RegisterForm from './authenticationComponents/RegisterForm';
import './form.css';

export default class Register extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="formContainer">
        <RegisterForm />
      </div>
    );
  }
}
