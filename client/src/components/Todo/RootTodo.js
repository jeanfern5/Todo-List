import React, { Component } from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

import TodoList from './TodoList'; //contains feature: displays all todos
import TodoCreate from './TodoCreateModal'; //contains feature: adds a new todo
import { Container, ContentContainer, Heading, LandingContainer, LandingHeading, LandingContent } from '../Styling/RootTodoStyles';
import { Button } from '../Styling/GlobalStyles';
import config from '../../config';
import Spinner from "../Spinner/Spinner";


export default class TodoContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos:[],
      modalShows: false,
      isLoading: false,
      title: "",
      description: "",
      date: "",
    }
  };

  componentDidMount() {
    this.fetchTodos();
  };

  fetchTodos() {
      this.setState({ isLoading: true });

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

      fetch(`${config.LOCALHOST}`, {
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

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleCreate = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try{
        const requestBody = {
            query: `
            mutation {
                createTodo(todoInput: { title:"${this.state.title}", description:"${this.state.description}", date: "${this.state.date}" }) {
                    _id
                    title
                    description
                    date
                }
            }
          `
        };

        fetch(`${config.LOCALHOST}`, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + config.TOKEN
            }
            })
            .then(res => {
              if ((res.status !== 200) && (res.status !== 201)) {
                  throw new Error('Create Todo Failed!');
              }
      
              return res.json();
            })
            .then(resData => {
                if (resData.errors) {
                 alert(resData.errors[0].message);
                }

                
                this.setState(prevState => {
                  const updatedTodos = [...prevState.todos];

                  updatedTodos.push({
                    _id: resData.data.createTodo._id,
                    title: resData.data.createTodo.title,
                    date: resData.data.createTodo.date,
                    description: resData.data.createTodo.description,
                  });

                  return { todos: updatedTodos };
                });

                this.setState({ isLoading: false }); 
                console.log('Create Todo Data:', resData.data);
                console.log('Updated Todos:', this.state.todos);
            })
            .catch(err => {
                console.log('Create Todo Error:', err);
                this.setState({ isLoading: false });
            })

    } catch(err) {
        alert(err);
        this.setState({ isLoading: false });
    }
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
        </ContentContainer>

        <ButtonToolbar>
          <Button
          variant="primary"
          onClick={() => this.setState({ modalShows: true })}
          >
            <FaPlus style={{height:"2rem"}} />
          </Button>
          <TodoCreate
          handle_create_todo={this.handleCreate}
          handle_change={this.handleChange}
          title={this.state.title}
          date={this.state.date}
          description={this.state.description}
          show={this.state.modalShows}
          onHide={modalClose}
          />
        </ButtonToolbar>
      </Container>
    );
  };

  renderLanding() {
    return (
      <LandingContainer>
        <LandingHeading>Todo App</LandingHeading>
        <LandingContent>A simple way to keep track of all your todos.</LandingContent>
      </LandingContainer>
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





