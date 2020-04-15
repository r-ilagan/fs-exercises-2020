import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const getAllPersons = () => {
  const request = axios.get(baseURL);
  return request.then((response) => {
    const people = response.data;
    return people;
  });
};

const addNewPerson = (makePerson) => {
  const request = axios.post(baseURL, makePerson);
  return request.then((response) => {
    return response.data;
  });
};

export default {
  getAllPersons,
  addNewPerson,
};
