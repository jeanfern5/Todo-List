import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import TodoItem from './TodoItem';

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            todos: []
        }
    }

    // componentDidMount() {
  
    // }

    // getTodos = () => {
    //     this.setState({ isLoading: true });

    //     const reqBody = {
    //         query: `
    //             query {
    //                 getTodos {
    //                     _id
    //                     title
    //                     description
    //                     date
    //                 }
    //             }
    //         `
    //     }
    // }

      

    render() {
        return(
            <Droppable droppableId="droppable-1"> 
                {(provided) => (
                    <TodoListContainer
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    >
                        {this.props.todos.map((item, index) => (
                        <TodoItem key={item._id} item={item} index={index} />
                        ))}
                        {provided.placehoder}
                    </TodoListContainer>
                )}
            </Droppable>
        )
    }
}


const TodoListContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 0.7rem;
    height: 75%;
    margin-bottom: 1rem;
    border: 1px solid black;
`;
