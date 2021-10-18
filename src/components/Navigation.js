import React from "react";
import { NavLink } from "react-router-dom";
import classes from "../components/Navigation.module.css";
/*** 
@Purpose : Used for Navigation Link
@Parameter : {}
@Author : INIC
**/
const Navigation = () => {
  return (
    <React.Fragment>
      <div className={classes.ul}>
        <li className={classes.li}>
          <NavLink to="/weather">Weather Home</NavLink>
        </li>
        <li className={classes.li}>
          <NavLink to="/favorite">Favourite Location</NavLink>
        </li>
      </div>
    </React.Fragment>
  );
};

export default Navigation;
