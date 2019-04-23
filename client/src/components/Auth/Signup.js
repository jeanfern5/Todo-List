import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import LoaderButton from "../LoaderButton";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      newUser: null
    };
  }

  validateForm() {
    return (
      (this.state.email.length > 0) &&
      (this.state.password.length > 7) &&
      (this.state.password === this.state.confirmPassword)
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
  
    this.setState({ isLoading: true });
  
    try {
      const requestBody = {
          query: `
          mutation {
              signupUser(userInput: { email: "${this.state.email}", password: "${this.state.password}" }) {
                  _id
                  email
                  awsId
              }
          }
        `
      }

      fetch('http://localhost:8080/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if ((res.status !== 200) && (res.status !== 201)) {
            throw new Error('Signup Failed!');
        }

        return res.json();
      })
      .then(resData => {
        console.log('Signup Data:', resData);
      })
      .catch(err => {
          console.log('Signup Error:', err);
      })

      this.setState({ isLoading: false });
      alert('Sent Email Verification Link')
      this.props.history.push("/login");
    } catch (err) {
      alert(err.message);
      this.setState({ isLoading: false });
    }
  
  };
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <LoaderButton
          block
          bsStyle="primary"
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
    );
  }
}
