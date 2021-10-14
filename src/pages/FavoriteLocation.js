import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router";

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
      <div style={{ maxHeight: "500px" }}>
        <h1>Favorite Page</h1>
        {console.log(params)}
        {favWeather.map((data, index) => (
          <div key={index}>
            <div>{data.name}</div>
            <div>{data.tempp}</div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default FavoriteWeather;
