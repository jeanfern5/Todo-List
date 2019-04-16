import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';


import TodoList from './TodoList';
import TodoForm from './TodoForm';
import { ContentContainer, Heading } from '../Styling/globalStyling';


export default class TodoContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos:[
        {
          _id: 1528817077286,
          title: 'Organize Garage',
          description: "cleaning..............",
          date: '4/20/2019',
        },
        {
          _id: 1528817084358,
          title: 'Bake Cookies',
          description: "chocolate chip..............",
          date: '4/15/2019',
        },
        {
          _id: 1528817084350,
          title: 'Do Laundry',
          description: "sort by colors..............",
          date: '4/16/2019',
        }
      ],
    }
  };

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