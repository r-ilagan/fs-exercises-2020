import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const getConfig = () => {
  return {
    headers: { Authorization: token },
  };
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newBlog) => {
  const result = await axios.post(baseUrl, newBlog, getConfig());
  return result.data;
};

const update = async (id, updatedBlog) => {
  const result = await axios.put(`${baseUrl}/${id}`, updatedBlog, getConfig());
  return result.data;
};

export default { getAll, create, setToken, update };
