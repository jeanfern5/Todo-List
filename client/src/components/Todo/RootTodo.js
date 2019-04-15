import React from 'react';
import TodoList from './TodoList';

export default class TodoContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items:[
        {
          task: 'Organize Garage',
          id: 1528817077286,
          date: '4/15/2019',
          description: "cleaning.............."
        },
        {
          task: 'Bake Cookies',
          id: 1528817084358,
          date: '4/15/2019',
          description: "chocolate chip.............."
        }
      ],
    }
  };

  render() {
    return (
      <div className="todo-container">
        <h1>Todo List</h1>
        <TodoList 
          items={this.state.items}
        />
  
      </div>
    );
  };

};