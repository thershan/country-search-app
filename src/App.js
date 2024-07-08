import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching country data:', error));
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a country"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="country-grid">
        {filteredCountries.map(country => (
          <div key={country.cca3} className="countryCard">
            <img src={country.flags.png} alt={`${country.name.common} flag`} />
            <div>{country.name.common}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
