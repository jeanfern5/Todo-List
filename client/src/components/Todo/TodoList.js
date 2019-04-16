
import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import TodoItem from './TodoItem';

export default class TodoList extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return(
            <Droppable droppableId="droppable"> 
                {(provided) => (
                    <TodoListContainer
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    >
                        {this.props.todos.map((item, index) => <TodoItem key={item._id} item={item} index={index} />)}
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
`;

