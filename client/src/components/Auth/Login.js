import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import config from "../../config"
import LoaderButton from "../LoaderButton";
import { Form, Error, P } from '../Styling/AuthStyles'


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoading: false,
        email: "",
        password: "",
        message: "",
        token: ''
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


      fetch((config.HOSTNAME), {
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
          this.setState({ isLoading: false });
          this.props.history.push("/");
        })
        .catch(err => {
            console.log('Login Error:', err);
            this.setState({ isLoading: false})
        })

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

        <Link to="/login/forgotpassword"><P>Forgot password?</P></Link>

        <Error>{this.state.message}</Error>
      </Form>
    );
  }
}
