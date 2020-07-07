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

export const setMessage = (message, time) => {
  return dispatch => {
    dispatch({
      type: 'SET',
      data: {
        message,
      },
    });
    setTimeout(() => dispatch(clearMessage()), time * 1000);
  };
};

export const clearMessage = () => {
  return {
    type: 'CLEAR',
  };
};

export default reducer;
