import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ data }) => {
  return (
    <div>
      <h1>{data[0].name}</h1>
      <p>capital {data[0].capital}</p>
      <p>population {data[0].population}</p>
      <h3>languages</h3>
      <Languages data={data} />
      <img alt="flag" src={data[0].flag}></img>
    </div>
  );
};

const Languages = ({ data }) => {
  return (
    <ul>
      {data[0].languages.map((item) => (
        <Language key={item.name} name={item.name}/>
      ))}
    </ul>
  );
};

const Language = ({ name }) => {
  return <li>{name}</li>;
};


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

  const showResults = (dataToFilter) => {
    return keyword.length > 0 && dataToFilter.length > 10 ? (
      <p>Too many matches,specify another filter</p>
    ) : dataToFilter.length <= 10 && dataToFilter.length > 1 ? (
      dataToFilter.map((each) => <p key={each.name}>{each.name}</p>)
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
