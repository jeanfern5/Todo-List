import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup'
import NotFound from "./components/NotFound";
import Todo from './components/Todo/RootTodo';
import ComponentRoute from './components/Routes';

export default ({ childProps }) =>

  <Switch>
    <ComponentRoute path="/" exact component={Home} props={childProps} />
    <ComponentRoute path="/login" exact component={Login} props={childProps} />
    <ComponentRoute path="/signup" exact component={Signup} props={childProps} />
    <ComponentRoute path="/todos" exact component={Todo} props={childProps} />

    <Route component={NotFound} />
  </Switch>;