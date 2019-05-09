import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";

import Routes from "./Routes";
import { AppContainer } from "./AppStyles"
import logo from './components/Styling/todo-logo2.png';


class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      open: false,
    };
  };

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    };
  
    this.setState({ isAuthenticating: false });
  };
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = async event => {
    await Auth.signOut();
  
    this.userHasAuthenticated(false);
    this.setState({ token:null, userId:null });
    this.props.history.push("/login");
  };
  
  login = (token, userId) => {
    this.setState({ token:token, userId:userId });
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
  
    return (
      !this.state.isAuthenticating &&
      <AppContainer>
        <Navbar fluid collapseOnSelect className="Navbar">
          <Navbar.Brand>
            <Link to="/"><img  src={logo} alt="logo" className="Logo" /></Link>
          </Navbar.Brand>
          <Navbar.Toggle/>

          <Navbar.Collapse>
            <Nav pullRight className="Nav Auth">
              {this.state.isAuthenticated
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                : 
                <Fragment>
                    <LinkContainer to="/signup">
                      <NavItem>Signup</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                  </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
 
        <Routes childProps={childProps} />
      </AppContainer>
    );
  };

};

export default withRouter(App);
  