
import React from 'react';
import { DragDropContent } from 'react-beautiful-dnd';

export default function TodoList(props) {
    return (
        <ul>
            {props.items.map(item => (
                <li key={item.id}>{item.date}{item.task}{item.description}</li>
            ))}
        </ul>
    );
};
