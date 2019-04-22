import styled from 'styled-components';

//container for navigation and footer
export const OuterContainer = styled.div`
    border: 1px solid pink;
    height: 3rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ContentContainer = styled.div`
    min-height: 24rem;
    padding: 0 5%;
`;

export const Heading = styled.h1`
    text-align: center;
    font-weight: bold;
    font-size: 1.5rem;
    padding: 0.5rem 5%;
    border: 1px solid black;
`;
