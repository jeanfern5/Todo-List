import React, { Component } from 'react';
import { ButtonToolbar } from 'react-bootstrap';

import TodoList from './TodoList'; //contains feature: displays all todos
import TodoCreate from './TodoCreateModal'; //contains feature: adds a new todo
import TodoItem from './TodoItem'; //contains feature: displays single todo, updates todo, and deletes todo
import { Container, ContentContainer, Heading, Button } from '../Styling/globalStyling';
import config from '../../config';
import Spinner from "../Spinner/Spinner";


export default class TodoContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos:[],
      modalShows: false,
      isLoading: false,
      selectedTodo: false,
      title: "",
      description: "",
      date: "",
    }
  };

  componentDidMount() {
    this.fetchTodos();
  };

  fetchTodos() {
      const requestBody = {
          query: `
          query {
              getTodos {
                  _id
                  title
                  description
                  date
              }
          }
        `
      }

      fetch('http://localhost:8080/graphql', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + config.TOKEN
          }
          })
          .then(res => {
            if ((res.status !== 200) && (res.status !== 201)) {
                throw new Error('Retrieve Todo Failed!');
            }
    
            return res.json();
          })
          .then(resData => {
              if (resData.errors) {
              alert(resData.errors[0].message);
              }

              const todos = resData.data.getTodos;

              this.setState({ todos: todos, isLoading: false });

              console.log('Retrieve Todo Data:', resData);
          })
          .catch(err => {
              console.log('Retrieve Todo Error:', err);
          })
  };

  showDetails = () => {
    this.setState({ selectedTodo: true })
  };

  renderTodos() {
    let modalClose = () => this.setState({ modalShows: false });

    return (
      <Container>
        <ContentContainer>
        <Heading>Todo List</Heading>

        {this.state.isLoading ? <Spinner /> : (
          <TodoList todos={this.state.todos} />
        )}

        {this.state.selectedTodo && (
          <TodoItem show={this.state.modalShows} todos={this.state.todos}/>
        )}
        </ContentContainer>

        <ButtonToolbar>
          <Button
          variant="primary"
          onClick={() => this.setState({ modalShows: true })}
          >
            Add New Todo!
          </Button>
          <TodoCreate
          todos={this.state.todos}
          show={this.state.modalShows}
          onHide={modalClose}
          />
        </ButtonToolbar>
      </Container>
    );
  };

  renderLanding() {
    return (
      <div>
        <h1>Todo App</h1>
        <p>A simple way to keep track of all your todos.</p>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? this.renderTodos() : this.renderLanding()}
      </div>
    );
  };

};





