import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Weather from "./pages/Weather";
import FavoriteLocation from "./pages/FavoriteLocation";

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Redirect to="/welcome" />
      </Switch>
      <Switch>
        <Route path="/welcome" component={Weather} />
      </Switch>
      <Switch>
        <Route path="/favorite" component={FavoriteLocation}></Route>
      </Switch>
    </React.Fragment>
  );
};

export default App;
