import styled from 'styled-components';


export const Item = styled.div`
    border: 0.25rem solid transparent;
    border-bottom: 0.25rem solid black;
    padding: 3%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &:hover {
        border-color: #f2af58;
        cursor: grab;
    }

    .title {
        margin: 0 0.5rem 0 1rem;
        width: 9.1rem;
    }
    
    .date{
        width: 3rem;
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

        &:hover{
            color: #f2af58;
        }
    }

    @media (min-width: 1000px){
        padding: 2%;

        .trash {
            height: 1.25rem;
            width: 1.25rem;
            margin: 0 1rem 0 1rem;
        }

        .bars {
            height: 1.25rem;
            width: 1.25rem;
        }

        .title {
            font-size: 1rem;
            width: 12rem;
            margin-left: 3rem;
        }

        .date {
            font-size: 1rem;
        }
    }
`;

