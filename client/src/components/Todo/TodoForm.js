import React from 'react';

export default function TodoForm(props) {
    return (
        <form>
            <input
            placeholder="task"
            value={props.inputText} 
            onChange={props.handleInput}
            />
            <input
            placeholder="description (optional)"
            value={props.inputText} 
            onChange={props.handleInput}
            />
            <input
            placeholder="due date"
            value={props.inputText} 
            onChange={props.handleInput}
            />

            <button onClick={props.addItem}>Add Todo</button>
        </form>
    );
};
