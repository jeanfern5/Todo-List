import React, { Component } from 'react';

// import NavBar from './components/NavBar';
import Todo from './components/Todo/RootTodo';
// import Footer from './components/Footer';

export default class App extends Component {
  render() {
    return (
      <div>
        {/* <NavBar /> */}
        <Todo />
        {/* <Footer /> */}
      </div>
    );
  }
}

