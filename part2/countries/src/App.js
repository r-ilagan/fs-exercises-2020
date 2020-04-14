import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';
import Find from './components/Find';

const App = () => {
  const [countryList, setCountryList] = useState([]);
  const [filter, setFilter] = useState('');

  const restCountry = () => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      const countryList = response.data;
      setCountryList(countryList);
    });
  };

  useEffect(restCountry, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleOnClick = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Find handleFilter={handleFilter} />
      <Country
        countryList={countryList}
        filter={filter}
        handleOnClick={handleOnClick}
      />
    </div>
  );
};

export default App;
