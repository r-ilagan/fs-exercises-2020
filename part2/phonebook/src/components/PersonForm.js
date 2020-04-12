import React from 'react';

const PersonForm = ({ handlers, states }) => {
  const { addNewName, handleNameChange, handleNumberChange } = handlers;
  const { newName, newNumber } = states;
  return (
    <form onSubmit={addNewName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
