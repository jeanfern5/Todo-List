import React from "react";

import { LandingContainer, LandingHeading } from './Styling/RootTodoStyles';
import NotFound from './Styling/not-found-image.png';

export default () =>
  <LandingContainer>
    <LandingHeading>Sorry, page not found!</LandingHeading>
    <img  src={NotFound} alt="page not found" style={{height:"50%", width:"50%", margin:"3rem 21%"}}/>

  </LandingContainer>;