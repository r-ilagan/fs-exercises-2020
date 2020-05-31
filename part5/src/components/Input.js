import React from 'react';

const Input = ({ name, handleChange }) => {
  return (
    <div>
      {name}:
      <input
        type="text"
        name={name}
        onChange={({ target }) => handleChange(target.value)}
      />
    </div>
  );
};

export default Input;
