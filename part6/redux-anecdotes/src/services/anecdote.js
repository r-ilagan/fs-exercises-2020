import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  
  return response.data;
};

const vote = async (anecdote) => {
  const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  await axios.put(`${baseUrl}/${anecdote.id}`, changedAnecdote);
}

export default { getAnecdotes, createAnecdote, vote };