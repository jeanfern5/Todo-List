import React, { Component } from 'react';
import styled from 'styled-components';
import { ButtonToolbar } from "react-bootstrap";
import { FaBars, FaTrashAlt } from 'react-icons/fa';

import TodoUpdate from './TodoUpdateModal';
import TodoDelete from './TodoDeleteModal';

export default class TodoItem extends Component {
    constructor(props){
        super(props);
        this.state = {
          updateModalShows: false,
          deleteModalShows: false,
          todos: this.props.todos
        };
    };

    render() {
        const { title, description, date } = this.props.item;
        const { todoId } = this.props;
        let modalClose = () => this.setState({ updateModalShows: false, deleteModalShows: false});

        return(
            <TodoItemContainer>
                <p>{new Date(date).toLocaleDateString()}</p>
                <p>{title}</p>
                <ButtonToolbar>
                    <FaTrashAlt 
                    onClick={() => {this.setState({deleteModalShows: true})}}
                    />
                    <TodoDelete
                    show={this.state.deleteModalShows}
                    onHide={modalClose}
                    title={title}
                    todo_id={todoId}
                    />
                </ButtonToolbar>
                <ButtonToolbar>
                    <FaBars
                    onClick={() => {this.setState({updateModalShows: true})}}
                     />
                    <TodoUpdate
                    show={this.state.updateModalShows}
                    onHide={modalClose}
                    title={title}
                    description={description}
                    date={date}
                    todo_id={todoId}
                    />
                </ButtonToolbar>
            </TodoItemContainer>
                
        )
    }
}

const TodoItemContainer = styled.div`
    border: 1px solid lightgrey;
    border-radius: 0.125rem;
    padding: 3%;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;