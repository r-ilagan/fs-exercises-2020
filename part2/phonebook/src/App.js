import React, { useState, useEffect } from 'react';
import personService from './services/person';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const hook = () => {
    personService.getAllPersons().then((persons) => {
      setPersons(persons);
      console.log('people loaded', persons.length, 'people');
    });
  };

  useEffect(hook, []);

  const addNewName = (event) => {
    event.preventDefault();
    let exists = false;
    let id;

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
      };

      personService
        .addNewPerson(makePerson)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          setNewName('');
          setNewNumber('');
          setIsError(false);
          setMessage(`Added ${createdPerson.name}`);
          setTimeout(() => setMessage(null), 5000);
        })
        .catch((error) => {
          setIsError(true);
          setMessage(error.response.data.error);
          setTimeout(() => setMessage(null), 6000);
        });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToUpdate = persons.find((person) => person.id === id);
        const changes = { ...personToUpdate, number: newNumber };
        personService
          .changeNumber(id, changes)
          .then((updatedPerson) => {
            setPersons(
              persons.map((contact) =>
                contact.id !== id ? contact : updatedPerson
              )
            );
            setMessage(`Changed ${updatedPerson.name}'s number`);
            setTimeout(() => setMessage(null), 5000);
            setNewName('');
            setNewNumber('');
          })
          .catch((error) => {
            setIsError(true);
            setMessage(
              `Information of ${personToUpdate.name} has already been removed from the server`
            );
            setTimeout(() => setMessage(null), 5000);
            setNewName('');
            setNewNumber('');
            setPersons(
              persons.filter((person) => person.id !== personToUpdate.id)
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
        return person.id !== id;
      })
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
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
