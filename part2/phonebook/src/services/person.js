import axios from 'axios';

const baseURL = '/api/persons';

const getAllPersons = () => {
  const request = axios.get(baseURL);
  return request.then((response) => {
    return response.data;
  });
};

const addNewPerson = (makePerson) => {
  const request = axios.post(baseURL, makePerson);
  return request.then((response) => {
    return response.data;
  });
};

const removePerson = (id) => {
  axios.delete(`${baseURL}/${id}`);
};

const changeNumber = (id, newNumber) => {
  const request = axios.put(`${baseURL}/${id}`, newNumber);
  return request.then((response) => response.data);
};

export default {
  getAllPersons,
  addNewPerson,
  removePerson,
  changeNumber,
};
