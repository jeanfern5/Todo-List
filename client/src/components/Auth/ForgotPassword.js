import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { HelpBlock, FormGroup,Glyphicon,FormControl,ControlLabel } from "react-bootstrap";

import { Form, Error, Success } from '../Styling/AuthStyles';
import { BoldSpan } from '../Styling/GlobalStyles';
import LoaderButton from "../LoaderButton";


export default class ForgotPasword extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          code: "",
          email: "",
          password: "",
          codeSent: false,
          confirmed: false,
          confirmPassword: "",
          isConfirming: false,
          isSendingCode: false,
          message: "",
        };
    };

    validateCodeForm() {
        return this.state.email.length > 9;
    };

    validateResetForm() {
        return (
          (this.state.code.length > 0) &&
          (this.state.password.length > 0) &&
          (this.state.password === this.state.confirmPassword)
        );
      }
    
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };
    
    handleSendCodeClick = async event => {
        event.preventDefault();
    
        this.setState({ isSendingCode: true });
    
        try {
          await Auth.forgotPassword(this.state.email);
          this.setState({ codeSent: true });
        } catch (err) {
        //   alert(err.message);
          this.setState({ isSendingCode: false, message: err.message });
        }
      };
    
    handleConfirmClick = async event => {
        event.preventDefault();

        this.setState({ isConfirming: true });

        try {
            await Auth.forgotPasswordSubmit(
            this.state.email,
            this.state.code,
            this.state.password
            );
            this.setState({ confirmed: true });
        } catch (e) {
            alert(e.message);
            this.setState({ isConfirming: false });
        }
    };


    renderRequestCodeForm() {
        return (
          <Form onSubmit={this.handleSendCodeClick}>
            <FormGroup bsSize="large" controlId="email">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <LoaderButton
              block
              type="submit"
              bsStyle="primary"
              bsSize="large"
              loadingText="Sending…"
              text="Send Confirmation"
              isLoading={this.state.isSendingCode}
              disabled={!this.validateCodeForm()}
            />
            <Error>{this.state.message}</Error>
          </Form>
        );
      }
    
    renderConfirmationForm() {
        return (
            <Form onSubmit={this.handleConfirmClick} style={{margin:"2rem auto"}}>
            <FormGroup bsSize="large" controlId="code">
                <ControlLabel>Confirmation Code</ControlLabel>
                <FormControl
                autoFocus
                type="tel"
                value={this.state.code}
                onChange={this.handleChange}
                />
                <HelpBlock style={{textAlign:"center"}}>
                Please check your email <br/><BoldSpan>{this.state.email}</BoldSpan><br/> for the confirmation code.
                </HelpBlock>
            </FormGroup>
            <hr />
            <FormGroup bsSize="large" controlId="password">
                <ControlLabel>New Password</ControlLabel>
                <FormControl
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup bsSize="large" controlId="confirmPassword">
                <ControlLabel>Confirm Password</ControlLabel>
                <FormControl
                type="password"
                onChange={this.handleChange}
                value={this.state.confirmPassword}
                />
            </FormGroup>
            <LoaderButton
                block
                type="submit"
                bsStyle="primary"
                bsSize="large"
                text="Confirm"
                loadingText="Confirm…"
                isLoading={this.state.isConfirming}
                disabled={!this.validateResetForm()}
            />
            </Form>
        );
    }

    renderSuccessMessage() {
        return (
            <Success>
                <Glyphicon glyph="ok" />
                <p>Your password has been reset.</p>
                <p>
                    <Link to="/login">
                    Click here to login with your new credentials.
                    </Link>
                </p>
            </Success>
        );
    }

    render() {
        return (
            <div className="ResetPassword">
            {!this.state.codeSent
                ? this.renderRequestCodeForm()
                : !this.state.confirmed
                ? this.renderConfirmationForm()
                : this.renderSuccessMessage()}
            </div>
        );
    }
}

