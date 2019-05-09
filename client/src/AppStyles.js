import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  font-family: sans-serif;
  font-fize: 1.5rem;
  width: 100vw;
  height: 100vh;

  .Logo {
    height: 1.5rem
  }

  .Nav {
    position: fixed;
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    width: 50%;
  }

  //iPhone 6/7/8 - Mac inspect reference
  @media (min-width: 375px){
    .Nav {
      width: 58%;
    }
  } 

  //iPhone 6/7/8 Plus & iPhone X - Mac inspect reference
  @media (min-width: 414px){
    .Nav {
      width: 61%;
    }
  }

  //iPad - Mac inspect reference
  @media (min-width: 768px){
    .Nav {
      width: 92%;
    }

    .Navbar {
      height: 4rem;
    }

    .Logo {
      height: 2.25rem;
      margin-left: 1.5rem;
    }

    .Auth {
      font-size: 1.25rem;
      margin-top: .5rem;
    }
  }

  //iPad - Mac inspect reference
  @media (min-width: 768px){
    .Nav {
      width: 92%;
    }

    .Navbar {
      height: 4rem;
    }

    .Logo {
      height: 2.25rem;
      margin-left: 1.5rem;
    }

    .Auth {
      font-size: 1.25rem;
      margin-top: .5rem;
    }
  }

  @media (min-width: 1000px){
    .Navbar {
      padding: 2rem 0;
    }

    .Logo {
      height: 2.9rem;
      margin:-2.25rem 0 0 6rem;
    }

    .Auth {
      font-size: 1.25rem;
      margin-top: -1.3rem;
    }
  }

  //iPad Pro- Mac inspect reference
  @media (min-width: 1024px){
    .Nav {
      width: 93%;
    }

    .Logo {
      margin: -2.25rem 0 0 2.25rem
    }
  }

  

  
`;
