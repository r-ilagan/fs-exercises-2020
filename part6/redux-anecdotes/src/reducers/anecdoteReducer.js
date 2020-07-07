import anecdoteService from '../services/anecdote';

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      return state.map((a) => {
        if (a.id === id) {
          a.votes++;
        }
        return a;
      });
    case 'NEW_ANECDOTE':
      return state.concat(action.data);
    case 'INIT':
      return action.data;
    default:
      return state;
  }
};

export const vote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.vote(anecdote);
    dispatch({
      type: 'VOTE',
      data: { 
        id: anecdote.id 
      },
    }
  )};
};

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.createAnecdote(anecdote);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: anecdote,
        votes: 0,
      },
  })};
};

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAnecdotes();
    dispatch({
    type: 'INIT',
    data: anecdotes, 
  })}
}

export default reducer;
