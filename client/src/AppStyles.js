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

  //iPhone 6/7/8 - inspect reference
  @media (min-width: 375px){
    .Nav {
      width: 58%;
    }
  } 

  //iPhone 6/7/8 Plus & iPhone X - inspect reference
  @media (min-width: 414px){
    .Nav {
      width: 61%;
    }
  }

  //iPad - inspect reference
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

    .Logout {
      font-size: 1.25rem;
      margin-top: .5rem;
    }
  }

  //iPad - inspect reference
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

    .Logout {
      font-size: 1.25rem;
      margin-top: .5rem;
    }
  }
  
  //iPad - inspect reference
  @media (min-width: 768px){
    .Nav {
      width: 93%;
    }

    .Logo {
      height: 2.25rem;
      margin-left: 2.25rem;
    }
  }
  

  //13inch Screen - inspect reference
  @media (min-width: 1000px){
    .Navbar {
      padding: 2rem 0;
    }

    .Logo {
      height: 2.9rem;
      margin:-2.25rem 0 0 6rem;
    }

    .Logout {
      font-size: 1.25rem;
      margin-top: -1.25rem;
    }
  }

  

  
`;
