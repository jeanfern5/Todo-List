import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';


import TodoList from './TodoList';
import TodoForm from './TodoFormModal';
import { ContentContainer, Heading } from '../Styling/globalStyling';


export default class TodoContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos:[],
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
                user {
                    _id
                    email
                }
            }
        }
      `
    }

    fetch('http://localhost:8080/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json',
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

            this.setState({ todos: todos });

            console.log('Retrieve Todo Data:', resData);
        })
        .catch(err => {
            console.log('Retrieve Todo Error:', err);
        })
}

  onDragEnd = result => {
    //TODO: reorder columns
  }

  render() {
    return (
      <ContentContainer onDragEnd={this.onDragEnd}>
        <Heading>Todo List</Heading>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <TodoList todos={this.state.todos} />
        </DragDropContext>
        <TodoForm />
      </ContentContainer>
    );
  };

};

