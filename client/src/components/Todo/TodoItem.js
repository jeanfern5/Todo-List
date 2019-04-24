import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

export default class TodoItem extends Component {
    // constructor(props) {
    //     super(props);

    // }

    render() {
        const {_id, title, description, date} = this.props.item;

        return(
            <Draggable draggableId={_id} index={this.props.index}>
                {(provided) => (
                    <TodoItemContainer
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    >
                        <p>{new Date(date).toLocaleDateString()}</p>
                        <p>{title}</p>
                        <p>{(description.length > 0) ? "see notes" : "edit"}</p>
                    </TodoItemContainer>
                )}
            </Draggable> 
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