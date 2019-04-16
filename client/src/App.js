import React, { Component } from 'react';
import styled from 'styled-components';

import NavBar from './components/NavBar';
import Todo from './components/Todo/RootTodo';
import Footer from './components/Footer';

export default class App extends Component {
  render() {
    return (
      <AppContainer>
        <NavBar />
        <Todo />
        <Footer />
      </AppContainer>
    );
  }
}


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  font-family: sans-serif;
  font-fize: 1.5rem;
  width: 100vw;
  height: 100vh;
`;
