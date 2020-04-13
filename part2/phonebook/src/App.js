import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const hook = () => {
    console.log('effect started');

    axios.get('http://localhost:3001/persons').then((response) => {
      const note = response.data;
      setPersons(note);
      console.log('notes loaded', note.length, 'notes');
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
      };
      setPersons(persons.concat(makePerson));
      setNewName('');
      setNewNumber('');
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
