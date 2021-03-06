import styled from 'styled-components';


export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 75%;
    margin: 5rem auto;

    @media (min-width: 768px){
        width: 50%;
    }

    @media (min-width: 1000px){
        width: 30%;
    }
`;

export const Error = styled.p`
    margin: 1rem auto;
    text-align:center;
    color:red;
`;

export const P = styled.p`
    margin: 1rem auto;
    text-align:center;
    
`;

export const Success = styled.div`
    margin: 2rem auto;
    text-align: center;
    width: 98%;
    line-height: 25px;
`;

