import styled from 'styled-components';


export const Container = styled.div`
    min-height: 31rem;
    padding: 0 5%;

    .plus{
        height:2rem;

        &:hover{
            color: orange;
        }
    }
`;


export const ContentContainer = styled.div`
    border: .25rem solid black;
    border-radius: 3px;
`;


export const Heading = styled.h1`
    text-align: center;
    font-weight: bold;
    font-size: 1.5rem;
    padding: 0.5rem 5%;
    background: black;
    color:white;
`;

export const LandingContainer = styled.div`
    min-height: 31rem;
    margin: 5rem auto;
`;

export const LandingHeading = styled.h1`
    text-align: center;
    font-weight: bold;
    font-size: 1.5rem;
`;


export const LandingContent = styled.h1`
    text-align: center;
    padding: 2rem;
`;
