import React, { Component } from "react";
import styled from 'styled-components';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";

import LoaderButton from "./LoaderButton";


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoading: false,
        email: "",
        password: ""
    }; 
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
  
    this.setState({ isLoading: true });
  
    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);

      const requestBody = {
        query: `
        query {
            loginUser(email: "${this.state.email}", password: "${this.state.password}") {
                userId
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
              throw new Error('Login Failed!');
          }
  
          return res.json();
        })
        .then(resData => {
          console.log('Login Data:', resData);
        })
        .catch(err => {
            console.log('Login Error:', err);
        })


      this.props.history.push("/todos");
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }
   

  render() {
    return (
      <LoginContianer>
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
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />

        </form>
      </LoginContianer>
    );
  }
}

const LoginContianer = styled.div`
    padding: 60px 0;
`;