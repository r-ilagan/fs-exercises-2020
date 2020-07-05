const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

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

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  };
};

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content: anecdote,
      id: getId(),
      votes: 0,
    },
  };
};

export const initAnecdotes = (data) => {
  return {
    type: 'INIT',
    data, 
  }
}

export default reducer;
