import React from 'react';

const Input = ({ name, value, handleChange, type = 'text' }) => {
  return (
    <div>
      {name}:
      <input
        type={type}
        value={value}
        onChange={({ target }) => handleChange(target.value)}
      />
    </div>
  );
};

export default Input;
