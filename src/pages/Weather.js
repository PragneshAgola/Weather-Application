import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherAction } from "../redux/actionCreator/Weather-API";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

import Loader from "../asset/weather-loader.gif";
import WeatherLogo from "../asset/weatherLogo.png";
import "./Weather.css";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";

/* 
@Purpose : Dispatching function, Loading State, Error Handling, fetching data using redux, State manipulaiton, Add data using addDoc in firestore
@Parameter : {}
@Author : INIC
*/

const Weather = () => {
  const [city, setCity] = useState("Ahmedabad");
  const [tempToggle, setTempToggle] = useState(false);
  const [favToggle, setFavToggle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeatherAction("Ahmedabad"));
  }, [dispatch]);

  const state = useSelector((state) => state);
  const { weather, loading, error } = state;
  const clearValue = () => {
    setCity("");
  };
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(fetchWeatherAction(city));
    setTempToggle(false);
    setFavToggle(false);
    setCity("");
  };

  if (loading) {
    return <img src={Loader} alt=""></img>;
  }
  const changeTempHandler = () => {
    setTempToggle((prev) => !prev);
  };

  const changeFavHandler = async (id, name, temp) => {
    setFavToggle(!favToggle);

    if (favToggle) {
      await setDoc(doc(db, "weather", `${Number(id)}`), {
        name: name,
        temp: temp,
      });
    }
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
              {!error ? (
                <div>
                  <div className="weather-gradient">
                    <button
                      className="fav-button"
                      onClick={() => {
                        changeFavHandler(
                          weather?.id,
                          weather?.name,
                          weather?.main?.temp
                        );
                      }}
                    >
                      {favToggle ? <MdBookmark /> : <MdBookmarkBorder />}
                    </button>
                  </div>
                  <div className="date-container">
                    <h2 className="date-dayname">
                      {weather?.name}, {weather?.sys?.country}
                    </h2>
                    <span>{new Date().toDateString("en-US")}</span>
                  </div>

                  <div className="weather-container">
                    <span onClick={changeTempHandler}>
                      {tempToggle ? "Temp C°" : "Temp F°"}
                    </span>
                    <i className="weather-icon" data-feather="sun"></i>

                    <h1 className="weather-temp">
                      {tempToggle
                        ? Math.ceil(
                            parseFloat(weather?.main?.temp) * (9 / 5) + 32
                          )
                        : Math.ceil(weather?.main?.temp)}
                      {tempToggle ? " °F" : " °C"}
                    </h1>

                    <h3 className="weather-desc">
                      {weather?.weather[0].description}
                    </h3>
                  </div>
                </div>
              ) : (
                error && (
                  <div className="weather-gradient">
                    <h1
                      style={{
                        color: "black",
                        textAlign: "center",
                        textTransform: "capitalize",
                        paddingTop: "50%",
                      }}
                    >
                      🌎 {error.message}
                    </h1>
                  </div>
                )
              )}
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

              <div className="location-container">
                <form onSubmit={submitHandler}>
                  <input
                    className="location-button"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Search Location"
                    onClick={clearValue}
                  ></input>
                  <button className="search-button" type="submit" value={city}>
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Weather;
