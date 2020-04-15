import React, { useState, useEffect } from 'react';
import personServices from './services/personServices';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const hook = () => {
    personServices.getAllPersons().then((people) => {
      setPersons(people);
      console.log('people loaded', people.length, 'people');
    });
  };

  useEffect(hook, []);

  const addNewName = (event) => {
    event.preventDefault();
    let exists = false;
    for (const person of persons) {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`);
        exists = true;
      }
    }
    if (!exists) {
      const makePerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      personServices.addNewPerson(makePerson).then((person) => {
        setPersons(persons.concat(person));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        handlers={{ addNewName, handleNameChange, handleNumberChange }}
        states={{ newName, newNumber }}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} />
    </div>
  );
};

export default App;
