import React, { useState, useEffect } from "react";
import axios from "axios";
import Suggestions from "./components/Suggestions";
import Country from "./components/Country";

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

  const show = (countryName) => {
    setKeyword(countryName.toLowerCase());
  };

  const showResults = (dataToFilter) => {
    return keyword.length > 0 && dataToFilter.length > 10 ? (
      <Result />
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

const Result = () => <p>Too many matches,specify another filter</p>;

export default App;
