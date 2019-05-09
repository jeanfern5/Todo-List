import styled from 'styled-components';


export const Content = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 0.7rem;
    height: 23rem;
    overflow-y: scroll;

    //iPhone 6/7/8 - inspect reference
    @media (min-height: 667px){
        width: 100%;
        height: 29rem;
    }  

    //iPhone 6/7/8 Plus - inspect reference
    @media (min-height: 736px){
        width: 100%;
        height: 33rem;
    } 

    //iPhone X - inspect reference
    @media (min-height: 812px){
        width: 100%;
        height: 38rem;
    }  

    //iPhone X - inspect reference
    @media (min-height: 812px){
        width: 100%;
        height: 38rem;
    } 

    @media (min-height: 918px){
        width: 100%;
        height: 42rem;
    } 

    //iPad - inspect reference
    @media (min-height: 1024px){
        width: 100%;
        height: 47rem;
    } 

    @media (min-height: 1138px){
        width: 100%;
        height: 56rem;
    } 

    @media (min-height: 1252px){
        width: 100%;
        height: 63rem;
    } 

    //iPad Pro - inspect reference
    @media (min-height: 1366px){
        width: 100%;
        height: 71rem;
    } 
    
    
`;