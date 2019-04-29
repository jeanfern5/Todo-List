import React, { Component } from 'react';
import styled from 'styled-components';

import TodoItem from './TodoItem';

export default class TodoList extends Component {
    
    render() {

        return(
            <TodoListContainer>
                {this.props.todos.map((item) => (
                <TodoItem key={item._id} todoId={item._id} item={item} />
                ))}
            </TodoListContainer>
        );
    };
};


const TodoListContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 0.7rem;
    height: 75%;
    margin-bottom: 1rem;
    border: 1px solid black;
    overflow-y: scroll;
`;
