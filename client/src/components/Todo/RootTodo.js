import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';


import TodoList from './TodoList';
import TodoForm from './TodoFormModal';
import config from '../../config';
import { ContentContainer, Heading } from '../Styling/globalStyling';
import { ButtonToolbar, Button } from '../../../node_modules/react-bootstrap';
import Spinner from "../Spinner/Spinner";


export default class TodoContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos:[],
      modalShows: false,
      isLoading: false,
      selectedTodo: null,
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
            this.setState({ isLoading: false });
        })
};

  onDragEnd = result => {
    //TODO: reorder columns
  }

  render() {
    let modalClose = () => this.setState({ modalShows: false});

    return (
      <ContentContainer onDragEnd={this.onDragEnd}>
        <Heading>Todo List</Heading>

         { this.state.isLoading ? <Spinner /> : (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <TodoList todos={this.state.todos} onViewDetail={this.showDetailHandler} />
        </DragDropContext>
        )}
        
        <ButtonToolbar>
          <Button
          variant="primary"
          style={{ width:'98.4%' }}
          onClick={() => this.setState({ modalShows: true })}
          >
            Add New Todo Here!
          </Button>
          <TodoForm 
          todos={this.state.todos}
          show={ this.state.modalShows }
          onHide={ modalClose }
          />
        </ButtonToolbar>
      </ContentContainer>
    );
  };

};





