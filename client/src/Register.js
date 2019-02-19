import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

class Register extends Component {
  render() {
    return (
      <Form>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label> First Name </Form.Label>
          <Form.Control placeholder="Enter First Name"/>
          <Form.Label> Preferred Name </Form.Label>
          <Form.Control placeholder="Enter Preferred Name"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label> Last Name </Form.Label>
          <Form.Control placeholder="Enter Last Name"/>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label> Email Address </Form.Label>
          <Form.Control type="email" placeholder="Enter Email"/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label> Password </Form.Label>
          <Form.Control type="password" placeholder="Enter Password"/>
        </Form.Group>

        <Button variant="primary" type="submit">
        Sign Up
        </Button>

      </Form>
    );
  }
}

export default Register;
