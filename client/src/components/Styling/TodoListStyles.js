import styled from 'styled-components';


export const Content = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 0.7rem;
    height: 23rem;
    overflow-y: scroll;

    //iPhone 6/7/8
    @media (min-height: 667px){
        width: 100%;
        height: 29rem;
    }  

    //iPhone 6/7/8 Plus
    @media (min-height: 736px){
        width: 100%;
        height: 33rem;
    } 

    //iPhone X
    @media (min-height: 812px){
        width: 100%;
        height: 38rem;
    }  

    //iPad
    @media (min-height: 1024px){
        width: 100%;
        height: 51rem;
    } 
    
`;