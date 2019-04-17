import React from 'react';
import styled from 'styled-components';

export default function TodoForm(props) {
    return (
        <FormContainer>
            <Input
            placeholder="task"
            value={props.inputText} 
            onChange={props.handleInput}
            />
            <Input
            placeholder="description (optional)"
            value={props.inputText} 
            onChange={props.handleInput}
            />
            <Input
            placeholder="due date"
            value={props.inputText} 
            onChange={props.handleInput}
            />

            <button onClick={props.addItem}>Add Todo</button>
        </FormContainer>
    );
};

const FormContainer = styled.form`
    border: 1px solid blue;
`;

const Input = styled.input`
    border: 1px solid red;

`;

