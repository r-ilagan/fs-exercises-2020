const reducer = (state = '', { type, data }) => {
  switch (type) {
    case 'SET':
      return data.message;
    case 'CLEAR':
      return '';
    default:
      return state;
  }
};

export const setMessage = (message) => {
  return {
    type: 'SET',
    data: {
      message,
    },
  };
};

export const clearMessage = () => {
  return {
    type: 'CLEAR',
    data: {},
  };
};

export default reducer;
