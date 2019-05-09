import React from 'react';

import './Spinner.css';
import { Content } from '../Styling/TodoListStyles';


const spinner = () => (
  <Content>
    <div className="spinner">
      <div className="lds-dual-ring" />
    </div>
  </Content>
);

export default spinner;