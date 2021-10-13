import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherAction } from "../redux/thunk/Weather-API";

import Loader from "../asset/weather-loader.gif";
import WeatherLogo from "../asset/weatherLogo.gif";
import "./Weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWeatherAction("Ahmedabad"));
  }, [dispatch]);
  const state = useSelector((state) => state);
  const { weather, loading, error } = state;
  console.log(state);

  const submitHandler = (e) => {
    e.preventDefault();
    setCity("");
  };
  if (loading) {
    return <img src={Loader} alt=""></img>;
  }
  const changeTempHandler = () => {
    setToggle((prev) => !prev);
  };

  return (
    <React.Fragment>
      <div>
        <h2 className="h2">Weather App</h2>
        <img className="weatherLogo " src={WeatherLogo} alt="" />
      </div>
      <div>
        <section>
          <div className="container">
            <div className="weather-side">
              <div className="weather-gradient"></div>
              <div className="date-container">
                <h2 className="date-dayname">Wednesday</h2>
                <span class="date-day">13 Oct 2021</span>
                <i className="location-icon" data-feather="map-pin"></i>
                <span class="location">
                  {weather?.name}, {weather?.sys?.country}
                </span>
              </div>
              <div className="weather-container">
                <i className="weather-icon" data-feather="sun"></i>
                <h1 className="weather-temp">
                  {toggle
                    ? Math.ceil(weather?.main?.temp)
                    : Math.ceil(parseFloat(weather?.main?.temp) * (9 / 5) + 32)}
                  {toggle ? "°C" : "°F"}
                </h1>
                <span onClick={changeTempHandler}>{toggle ? "F" : "C"}°</span>
                <h3 className="weather-desc">
                  {weather?.weather[0].description}
                </h3>
              </div>
            </div>
            <div className="info-side">
              <div className="today-info-container">
                <div className="today-info">
                  <div className="humidity">
                    <span className="title">HUMIDITY</span>
                    <span className="value">{weather?.main?.humidity} %</span>
                    <div className="clear"></div>
                  </div>
                  <div className="wind">
                    <span className="title">WIND</span>
                    <span className="value">{weather?.wind?.speed} km/h</span>
                    <div className="clear"></div>
                  </div>
                </div>
              </div>
              {
                <div className="week-container">
                  <ul className="week-list">
                    <li className="active">
                      <i className="day-icon" data-feather="sun"></i>
                      <span className="day-name">Tue</span>
                      <span className="day-temp">29°C</span>
                    </li>
                    <li>
                      <i className="day-icon" data-feather="cloud"></i>
                      <span className="day-name">Wed</span>
                      <span className="day-temp">21°C</span>
                    </li>
                    <li>
                      <i className="day-icon" data-feather="cloud-snow"></i>
                      <span className="day-name">Thu</span>
                      <span className="day-temp">08°C</span>
                    </li>
                    <li>
                      <i className="day-icon" data-feather="cloud-rain"></i>
                      <span className="day-name">Fry</span>
                      <span className="day-temp">19°C</span>
                    </li>
                    <div className="clear"></div>
                  </ul>
                </div>
              }
              <div className="location-container">
                <form onSubmit={submitHandler}>
                  <input
                    className="location-button"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Search Location"
                  ></input>
                  <button
                    className="search-button"
                    value={city}
                    onClick={() => dispatch(fetchWeatherAction(city))}
                  >
                    Search
                  </button>
                  {error && (
                    <p
                      style={{
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {error.message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}

export default Weather;
