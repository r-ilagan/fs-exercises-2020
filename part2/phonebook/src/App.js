import React, { useState, useEffect } from 'react';
import personService from './services/person';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const hook = () => {
    personService.getAllPersons().then((people) => {
      setPersons(people);
      console.log('people loaded', people.length, 'people');
    });
  };

  useEffect(hook, []);

  const addNewName = (event) => {
    event.preventDefault();
    let exists = false;
    let id = 0;

    for (const person of persons) {
      if (person.name === newName) {
        id = person.id;
        exists = true;
      }
    }

    if (!exists) {
      const makePerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      personService.addNewPerson(makePerson).then((person) => {
        setPersons(persons.concat(person));
        setNewName('');
        setNewNumber('');
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToUpdate = persons.find((person) => person.id === id);
        const changes = { ...personToUpdate, number: newNumber };
        personService.changeNumber(id, changes).then((updatedPerson) => {
          setPersons(
            persons.map((contact) =>
              contact.id !== id ? contact : updatedPerson
            )
          );
        });
      }
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

  const handleDelete = (id) => {
    personService.removePerson(id);
    setPersons(
      persons.filter((person) => {
        return person.id !== parseInt(id);
      })
    );
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
      <Persons filter={filter} persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
