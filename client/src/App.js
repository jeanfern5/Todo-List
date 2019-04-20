// import React, { Component } from 'react';
// import styled from 'styled-components';

// import NavBar from './components/NavBar';
// import Todo from './components/Todo/RootTodo';
// import Footer from './components/Footer';

// export default class App extends Component {
//   render() {
//     return (
//       <AppContainer>
//         <NavBar />
//         <Todo />
//         <Footer />
//       </AppContainer>
//     );
//   }
// }

import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from 'styled-components';
import { Auth } from "aws-amplify";


// import { OuterContainer } from './Styling/globalStyling';
import Routes from "./Routes";
import withRouter from "../node_modules/react-router-dom/withRouter";


class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    await Auth.signOut();
  
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }  

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
  
    return (
      !this.state.isAuthenticating &&
      <AppContainer>
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Logo</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                : <Fragment>
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
  }
}

export default withRouter(App);
  



const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  font-family: sans-serif;
  font-fize: 1.5rem;
  width: 100vw;
  height: 100vh;
`;
