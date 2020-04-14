import React from 'react';

const Find = ({ handleFilter }) => {
  return (
    <div>
      find countries <input onChange={handleFilter} />
    </div>
  );
};

export default Find;
