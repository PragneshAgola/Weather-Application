import React, { useCallback, useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
// import { useParams } from "react-router";
import { GrLocation } from "react-icons/gr";
import { FaTemperatureLow } from "react-icons/fa";

import "./Weather.css";

/*** 
@Purpose : get data of favorite location from firestore
@Parameter : {}
@Author : INIC
**/

const FavoriteWeather = () => {
  const [favWeather, setFavWeather] = useState([]);
  const weatherCollectionRef = collection(db, "weather");
  // const params = useParams();
  const getFavoriteLocation = useCallback(async () => {
    const response = await getDocs(weatherCollectionRef);

    setFavWeather(
      response.docs.map((setData) => ({ ...setData.data(), id: setData.id }))
    );
  }, []);

  useEffect(() => {
    getFavoriteLocation();
  }, [getFavoriteLocation]);

  const deleteHandler = async (id) => {
    const removeFavLocation = doc(weatherCollectionRef, id);
    await deleteDoc(removeFavLocation);
    getFavoriteLocation();
  };

  return (
    <React.Fragment>
      <div>
        <h2>Your Favorite Location</h2>
        {/*{console.log(params)}*/}
        {favWeather.map((data, index) => (
          <div key={index}>
            <div
              className="fav-container"
              onClick={() => deleteHandler(data.id)}
            >
              <ul className="fav-list">
                <li className="active">
                  <span className="fav-name">
                    <GrLocation />
                    {data.name}
                  </span>
                  <span>
                    <FaTemperatureLow />
                    {data.temp}
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
