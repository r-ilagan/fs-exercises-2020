import React from 'react';
import Info from './Info';

const Country = ({ countryList, filter, handleOnClick }) => {
  const matchedCountries = countryList.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (matchedCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (matchedCountries.length > 1 && matchedCountries.length <= 10) {
    const found = matchedCountries.map((country) => {
      return (
        <div key={country.name}>
          {country.name}
          <button onClick={handleOnClick} value={country.name}>
            show
          </button>
        </div>
      );
    });
    return <>{found}</>;
  } else if (matchedCountries.length === 1) {
    const [country] = matchedCountries;
    return <Info country={country} />;
  } else {
    return <div>No matches</div>;
  }
};

export default Country;
