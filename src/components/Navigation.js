import React from "react";
import { NavLink } from "react-router-dom";
const Navigation = () => {
  return (
    <React.Fragment>
      <ul>
        <li>
          <NavLink to="/">Welcome Page</NavLink>
        </li>
        <li>
          <NavLink to="/weather">Weather</NavLink>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default Navigation;
