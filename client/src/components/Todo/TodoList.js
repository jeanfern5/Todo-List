import React, { Component } from 'react';

import TodoItem from './TodoItem';
import { Content } from '../Styling/globalStyling'

export default class TodoList extends Component {
    
    render() {

        return(
            <Content>
                {this.props.todos.map((item) => (
                <TodoItem key={item._id} todoId={item._id} item={item} />
                ))}
            </Content>
        );
    };
};
