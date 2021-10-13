import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeatherAction } from "../redux/thunk/weather";
import { useHistory } from "react-router";
const Welcomepage = () => {
  const [city, setCity] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    setCity("");
    history.push("/weather");
  };
  return (
    <React.Fragment>
      <div className="location-container">
        <form onSubmit={submitHandler}>
          <input
            className="location-button"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search City"
          ></input>
          <button
            className="search-button"
            value={city}
            onClick={() => dispatch(fetchWeatherAction(city))}
          >
            🔍
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Welcomepage;
