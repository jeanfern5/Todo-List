import styled from 'styled-components';


export const Button = styled.button`
    width: 98.4%;
    border: 1px solid black;
    background: black;
    color: white;
    height: 2.25rem;
    border-radius: 5px;
    margin: 1rem 0 0 5px;
    
    //iPad
    @media (min-width: 768px){
        width: 99.5%
    }
`;

export const BoldSpan = styled.span`
    font-weight: bold;
`;

export const ModalForm = styled.form`
    padding: 1rem;
`;

