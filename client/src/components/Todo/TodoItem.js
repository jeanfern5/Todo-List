import React, { Component } from 'react';
import styled from 'styled-components';
import { ButtonToolbar, Button } from "react-bootstrap";

import TodoUpdate from './TodoUpdateModal';

export default class TodoItem extends Component {
    constructor(props){
        super(props);
        this.state = {
          modalShows: false,
        };
    };

    render() {
        const {title, description, date} = this.props.item;
        let modalClose = () => this.setState({ modalShows: false});

        return(
            <TodoItemContainer>
                <p>{new Date(date).toLocaleDateString()}</p>
                <p>{title}</p>
                <div>{ (description.length > 0) 
                    ? 
                    <ButtonToolbar>
                        <Button
                        variant="primary"
                        onClick={() => {this.setState({modalShows: true})}}                          >
                        Notes
                        </Button>
                        <TodoUpdate
                        show={this.state.modalShows}
                        onHide={modalClose}
                        title={title}
                        description={description}
                        date={date}
                        /> 
                    </ButtonToolbar>
                    :  
                    <ButtonToolbar>
                        <Button
                        variant="primary"
                        onClick={() => {this.setState({modalShows: true})}}                          >
                        Edit
                        </Button>
                        <TodoUpdate
                        show={this.state.modalShows}
                        onHide={modalClose}
                        title={title}
                        description={description}
                        date={date}
                        />
                    </ButtonToolbar>
                }</div>
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