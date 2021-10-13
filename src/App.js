import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation";
import Weather from "./pages/Weather";
import Welcomepage from "./pages/WelcomePage";
const App = () => {
  return (
    <React.Fragment>
      <Navigation />
      <Switch>
        <Redirect to="/" />
      </Switch>
      <Switch>
        <Route path="/" component={Welcomepage} exact />
      </Switch>
      <Switch>
        <Route path="/weather" component={Weather} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
