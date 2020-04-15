import React from 'react';

const Persons = ({ filter, persons, handleDelete }) => {
  const confirmDelete = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      handleDelete(id);
    }
  };

  return (
    <div>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filter))
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}{' '}
            <button onClick={() => confirmDelete(person.name, person.id)}>
              delete
            </button>
          </p>
        ))}
    </div>
  );
};

export default Persons;
