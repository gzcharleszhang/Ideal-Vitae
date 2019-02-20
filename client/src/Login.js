import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
      event.preventDefault();
  }

  render() {
    return (
      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control autoFocus type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
          <Form.Text className="text-muted">
            Use the email you signed up with!
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group controlId="formBasicChecbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        // Add an option to reset password/register
        <Button block disabled={!this.validateForm()} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }

};

export default Login;
