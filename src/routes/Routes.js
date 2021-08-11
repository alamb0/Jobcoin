import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import Account from "../pages/Account";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/account" component={Account} />
        <Route path="*" component={Home} />
      </Switch>
    </Router>
  );
}
