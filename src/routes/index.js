import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Screens
import { Home } from '../screens'

const Routers = () => {

  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default Routers;