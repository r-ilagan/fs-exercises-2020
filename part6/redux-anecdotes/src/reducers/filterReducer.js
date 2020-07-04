const reducer = (state = '', { type, data }) => {
  switch (type) {
    case 'FILTER':
      return data.filter;
  
    default:
      return state;
  }
}

export const filter = (filter) => {
  return {
    type: 'FILTER',
    data: {
      filter,
    }
  };
}

export default reducer;