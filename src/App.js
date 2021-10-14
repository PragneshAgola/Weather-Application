import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Weather from "./pages/Weather";
import FavoriteLocation from "./pages/FavoriteLocation";
import Navigation from "./components/Navigation";
const App = () => {
  return (
    <React.Fragment>
      <Navigation />
      <div style={{ maxHeight: "500px" }}>
        <Switch>
          <Redirect to="/weather" />
        </Switch>
        <Switch>
          <Route path="/weather" component={Weather} />
        </Switch>
        <Switch>
          <Route path="/favorite/:id" component={FavoriteLocation}></Route>
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default App;
