import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router";
import { fetchWeatherAction } from "../redux/thunk/Weather-API";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const FavoriteWeather = () => {
  const [favWeather, setFavWeather] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { weather } = state;
  // const { weather } = state;
  const weatherCollectionRef = collection(db, "weather");
  const params = useParams();
  const getFavoriteLocation = async () => {
    const response = await getDocs(weatherCollectionRef);

    setFavWeather(
      response.docs.map((setData) => ({ ...setData.data(), id: setData.id }))
    );
    dispatch(fetchWeatherAction());
  };

  useEffect(() => {
    getFavoriteLocation();
  }, []);

  return (
    <React.Fragment>
      <div style={{ maxHeight: "500px" }}>
        <h1>Favorite Page</h1>

        {favWeather && <div>{weather?.city}</div>}
      </div>
    </React.Fragment>
  );
};

export default FavoriteWeather;
