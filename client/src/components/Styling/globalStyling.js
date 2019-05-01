import styled from 'styled-components';


//RootTodo.js
export const Container = styled.div`
    min-height: 31rem;
    padding: 0 5%;
`;

//RootTodo.js
export const ContentContainer = styled.div`
    border: .25rem solid black;
    border-radius: 3px;
`;

//RootTodo.js
export const Heading = styled.h1`
    text-align: center;
    font-weight: bold;
    font-size: 1.5rem;
    padding: 0.5rem 5%;
    background: black;
    color:white;
`;

//RootTodo.js
export const Button = styled.button`
    width: 98.4%;
    margin-top: 1rem;
    border: 1px solid black;
    background: black;
    color: white;
    height: 2.25rem;
    border-radius: 5px;
    margin-left: 5px; 
`;

//TodoList.js
export const Content = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 0.7rem;
    height: 23rem;
    overflow-y: scroll;
`;

//TodoItem.js
export const Item = styled.div`
    border: 0.25rem solid transparent;
    border-bottom: 0.25rem solid black;
    padding: 3%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &:hover {
        border-color: blue;
    }
`;
