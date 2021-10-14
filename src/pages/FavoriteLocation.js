import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router";
import { GrLocation } from "react-icons/gr";
import { FaTemperatureLow } from "react-icons/fa";
import { MdBookmark } from "react-icons/md";

import "./Weather.css";

const FavoriteWeather = () => {
  const [favWeather, setFavWeather] = useState([]);
  const weatherCollectionRef = collection(db, "weather");
  const params = useParams();
  const getFavoriteLocation = async () => {
    const response = await getDocs(weatherCollectionRef);

    setFavWeather(
      response.docs.map((setData) => ({ ...setData.data(), id: setData.id }))
    );
  };

  useEffect(() => {
    getFavoriteLocation();
  }, []);

  return (
    <React.Fragment>
      <div>
        <h2>Your Favorite Location</h2>
        {console.log(params)}
        {favWeather.map((data, index) => (
          <div key={index}>
            <div className="week-container">
              <ul className="week-list">
                <li className="active">
                  <i className="day-icon" data-feather="sun"></i>
                  <MdBookmark />
                  <span className="day-name">
                    <GrLocation />
                    {` ${data.name}`}
                  </span>
                  <span className="day-temp">
                    <FaTemperatureLow />
                    {` ${data.temp}`}
                  </span>
                </li>
                <div className="clear"></div>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default FavoriteWeather;
