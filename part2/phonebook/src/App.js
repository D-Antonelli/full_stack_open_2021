import React, { useState, useEffect } from "react";
import personsService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import { MESSAGE_TYPE } from "./constants/MessageType";

const defaultMessage = {
  text: null,
  type: MESSAGE_TYPE.UNSET,
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(defaultMessage);

  useEffect(() => {
    personsService.getAll().then((persons) => setPersons(persons));
  }, []);

  const onNewName = (event) => {
    setNewName(event.target.value);
  };

  const onNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const resetInputs = () => {
    setNewName("");
    setNewNumber("");
  };

  const onDelete = (id, name) => {
    const confirmed = window.confirm(`Delete ${name}?`);
    confirmed &&
      personsService.deletePerson(id) &&
      setPersons(persons.filter((person) => person.id !== id));
  };

  const timeoutMessage = (ms = 5000) => {
    return setTimeout(() => {
      setMessage(defaultMessage);
    }, ms);
  };

  const addNewPerson = (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName) === undefined) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personsService.create(newPerson).then((data) => {
        setPersons(persons.concat(data));
        const successMessage = {
          text: `Added ${newName}`,
          type: MESSAGE_TYPE.SUCCESS,
        };
        setMessage(successMessage);
        timeoutMessage();
        resetInputs();
      });
    } else if (
      persons.find(
        (person) => person.name === newName && person.number !== newNumber
      )
    ) {
      const confirmed = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmed) {
        const found = persons.find(
          (person) => person.name === newName && person.number !== newNumber
        );
        const changedObj = { ...found, number: newNumber };
        personsService
          .change(found.id, changedObj)
          .then((newObj) => {
            setPersons(
              persons.map((person) =>
                person.id !== found.id ? person : newObj
              )
            );
            const successMessage = {
              text: `Changed ${newName}'s number to ${newNumber}`,
              type: MESSAGE_TYPE.SUCCESS,
            };
            setMessage(successMessage);
            timeoutMessage();
            resetInputs();
          })
          .catch((error) => {
            const errorMessage = {
              text: `Contact ${newName} has already removed from server`,
              type: MESSAGE_TYPE.ERROR,
            };
            setMessage(errorMessage);
            timeoutMessage();
          });
      }
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const listToShow =
    filter.length > 0
      ? persons.filter((person) =>
          person.name.toUpperCase().includes(filter.toUpperCase())
        )
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification detail={message} />
      <Filter value={filter} onChange={onFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addNewPerson}
        newName={newName}
        onNewName={onNewName}
        newNumber={newNumber}
        onNewNumber={onNewNumber}
      />
      <h3>Numbers</h3>
      <Persons list={listToShow} onClick={onDelete} />
    </div>
  );
};

export default App;
