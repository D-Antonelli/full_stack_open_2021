import React, { useState } from "react";
import axios from "axios";

const Country = ({ data }) => {
  const [weather, setWeather] = useState();
  const BASE_API = `http://api.weatherstack.com/current`;
  const AUTH = `?access_key=${process.env.REACT_APP_WEATHER_API_KEY}`;
  const END_POINT = `&query=${data[0].capital}&units=m`;

  useState(() => {
    let isMounted = true;
    const fetchWeather = async () => {
      const response = await axios.get(`${BASE_API}${AUTH}${END_POINT}`);
      response.status === 200 && isMounted && setWeather(response.data);
    };
    fetchWeather();
    //cleanup callback
    return () => {
      isMounted = false;
    };
  }, []);

  const showWeather =
    weather !== undefined && weather.current !== undefined ? (
      <Weather result={weather} />
    ) : (
      <p>No weather results</p>
    );

  return (
    <div>
      <Details data={data} />
      {showWeather}
    </div>
  );
};

const Weather = ({ result }) => {
  return (
    <section>
      <h2>Weather in {result.location.name}</h2>
      <p>
        <span className="bold">temperature:</span> {result.current.temperature}{" "}
        Celcius
      </p>
      <img alt="weather icon" src={result.current["weather_icons"][0]}></img>
      <p>
        <span className="bold">wind:</span> {result.current["wind_speed"]} mph
        direction {result.current["wind_dir"]}
      </p>
    </section>
  );
};

const Details = ({ data }) => {
  const item = data[0];
  return (
    <section>
      <h1>{item.name}</h1>
      <p>capital {item.capital}</p>
      <p>population {item.population}</p>
      <h2>Spoken languages</h2>
      <Languages data={data} />
      <img alt="flag" src={item.flag}></img>
    </section>
  );
};

const Languages = ({ data }) => {
  return (
    <ul>
      {data[0].languages.map((item) => (
        <Language key={item.name} data={item} />
      ))}
    </ul>
  );
};

const Language = ({ data }) => {
  return <li>{data.name}</li>;
};

export default Country;
