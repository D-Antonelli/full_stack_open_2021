import React, { useState, useEffect } from "react";
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

  return (
    <div>
      <Details data={data} />
      <Weather result={weather} />
    </div>
  );
};

const Weather = ({ result }) => {
  if (result !== undefined && result.current !== undefined) {
    return (
      <section>
        <h2>Weather in {result.location.name}</h2>
        <p>
          <span className="bold">temperature:</span>{" "}
          {result.current.temperature} Celcius
        </p>
        <img alt="weather icon" src={result.current["weather_icons"][0]}></img>
        <p>
          <span className="bold">wind:</span> {result.current["wind_speed"]} mph
          direction {result.current["wind_dir"]}
        </p>
      </section>
    );
  }

  return <p>No weather results</p>;
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

const Language = ({ data}) => {
  return <li>{data.name}</li>;
};

const Suggestions = ({ data, onClick }) => {
  return data.map((each) => (
    <div key={each.name}>
      <Suggestion data={each} />
      <ShowButton onClick={onClick} bind={each} text="show" />
    </div>
  ));
};

const ShowButton = ({ onClick, bind, text }) => {
  return (
    <button onClick={onClick} data-selected={bind.name}>
      {text}
    </button>
  );
};

const Suggestion = ({ data }) => {
  return <span>{data.name}</span>;
};

const MatchWarning = () => <p>Too many matches,specify another filter</p>;

const App = () => {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);

  const onInputChange = (event) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    const makeGetRequest = async () => {
      const API_ROOT = `https://restcountries.eu/rest/v2/all`;
      const result = await axios.get(`${API_ROOT}`);
      setData(result.data);
    };
    makeGetRequest();
  }, []);

  const dataToFilter = data.filter((country) =>
    country.name.toUpperCase().includes(keyword.toUpperCase())
  );

  const show = (event) => {
    const name = event.target.dataset.selected;
    setKeyword(name.toLowerCase());
  };

  const showResults = (dataToFilter) => {
    return keyword.length > 0 && dataToFilter.length > 10 ? (
      <MatchWarning />
    ) : dataToFilter.length <= 10 && dataToFilter.length > 1 ? (
      <Suggestions data={dataToFilter} onClick={show} />
    ) : dataToFilter.length === 1 ? (
      <Country data={dataToFilter} />
    ) : (
      ""
    );
  };

  return (
    <div>
      find countries
      <input onChange={onInputChange} value={keyword} />
      {showResults(dataToFilter)}
    </div>
  );
};

export default App;
