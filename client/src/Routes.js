import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup'
import ForgotPassword from './components/Auth/ForgotPassword'
import NotFound from "./components/NotFound";
import Todo from './components/Todo/RootTodo';
import ComponentRoute from './components/Routes';


export default ({ childProps }) =>
  <Switch>
    <ComponentRoute path="/signup" exact component={Signup} props={childProps} />
    <ComponentRoute path="/login" exact component={Login} props={childProps} />
    <ComponentRoute path="/login/forgotpassword" exact component={ForgotPassword} props={childProps} />
    <ComponentRoute path="/" exact component={Todo} props={childProps} />


    <Route component={NotFound} />
  </Switch>;