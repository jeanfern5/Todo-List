import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";

import LoaderButton from "../LoaderButton";
import { Form } from '../Styling/AuthStyles'
import { Message } from '../Styling/GlobalStyles'


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoading: false,
        email: "",
        password: "",
        message: "",
    }; 
  };

  validateForm() {
    return (
      (this.state.email.length > 0) && 
      (this.state.password.length > 7)
    );
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
                token
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
          // if (resData.data.loginUser.token) {
          //   this.context.login(
          //     resData.data.loginUser.token,
          //     resData.data.loginUser.userId
          //   )
          // };

          console.log('Login Data:', resData);
        })
        .catch(err => {
            console.log('Login Error:', err);
            this.setState({ isLoading: false})
        })

      this.setState({ isLoading: false });
      this.props.history.push("/");
    } catch (err) {
      this.setState({ isLoading: false, message: err.message });
    }
  }
   

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
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
          bsStyle="primary"
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Login"
          loadingText="Logging in…"
        />

        <Message>{this.state.message}</Message>
      </Form>
    );
  }
}
