import styled from 'styled-components';


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

    .trash {
        margin:0 0.75rem 0 0.5rem;
        height: 1rem;

        &:hover {
            color: red;
        }
    }

    .bars {
        height: 1rem;
    }
`;

