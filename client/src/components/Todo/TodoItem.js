import React, { Component } from 'react';
import { ButtonToolbar } from "react-bootstrap";
import { FaBars, FaTrashAlt } from 'react-icons/fa';

import TodoUpdate from './TodoUpdateModal';
import TodoDelete from './TodoDeleteModal';
import ViewSingleTodo from './ViewSingleTodoModal';
import { Item } from '../Styling/TodoItemStyles'


export default class TodoItem extends Component {
    constructor(props){
        super(props);
        this.state = {
          updateModalShows: false,
          deleteModalShows: false,
          singleTodoModalShows: false,
          todos: this.props.todos
        };
    };

    render() {
        const { title, description, date } = this.props.item;
        const { todoId } = this.props;
        let modalClose = () => this.setState({ updateModalShows: false, deleteModalShows: false, singleTodoModalShows: false });

        return(
            <Item>
                <div
                onClick={() => {this.setState({singleTodoModalShows: true})}}
                style={{display:"flex", flexDirection:"row", fontWeight:"bold", fontSize:"0.725rem"}}
                >
                    <p className="date">{new Date(date).toLocaleDateString('en-US', {timeZone: 'UTC'})}</p>
                    <p className="title">{title.length > 26 ? title.substring(0, 23) + " ..." : title}</p>
                </div>
                <ViewSingleTodo
                show={this.state.singleTodoModalShows}
                onHide={modalClose}
                title={title}
                description={description}
                date={date}
                todo_id={todoId}
                />

                <ButtonToolbar>
                    <FaTrashAlt 
                    className="trash"
                    onClick={() => {this.setState({deleteModalShows: true})}}
                    />
                    <TodoDelete
                    show={this.state.deleteModalShows}
                    onHide={modalClose}
                    title={title}
                    todo_id={todoId}
                    />

                    <FaBars
                    className="bars"
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
            </Item>
        )
    };
};