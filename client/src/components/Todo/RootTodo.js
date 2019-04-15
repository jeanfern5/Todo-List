import React from 'react';

import TodoList from './TodoList';
import TodoForm from './TodoForm';
import { ContentContainer, Heading } from '../Styling/globalStyling';


export default class TodoContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items:[
        {
          id: 1528817077286,
          date: '4/20/2019',
          task: 'Organize Garage',
          description: "cleaning.............."
        },
        {
          id: 1528817084358,
          date: '4/15/2019',
          task: 'Bake Cookies',
          description: "chocolate chip.............."
        }
      ],
    }
  };

  render() {
    return (
      <ContentContainer>
        <Heading>Todo List</Heading>
        <TodoList items={this.state.items} />
        <TodoForm />
      </ContentContainer>
    );
  };

};