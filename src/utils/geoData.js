import countriesStates from '../data/countries_states.json';

// Get all countries (names only)
export const getAllCountries = () => {
  return countriesStates.map(country => country.name);
};

// Get states by country name
export const getStatesOfCountry = (countryName) => {
  const country = countriesStates.find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase()
  );
  return country ? country.states : [];
};
