import React from 'react';

const Input = ({ name, handleChange, type = 'text' }) => {
  return (
    <div>
      {name}:
      <input
        type={type}
        name={name}
        onChange={({ target }) => handleChange(target.value)}
      />
    </div>
  );
};

export default Input;
