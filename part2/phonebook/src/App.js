import React, { useState } from "react";

const Filter = (props) => {
  return (
    <>
      filter shown with
      <input value={props.value} onChange={props.onChange} />
    </>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.newName} onChange={props.onNewName} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.onNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  return (
    <ul>
      {props.list.map((person) => (
        <Person key={person.name} name={person.name} number={person.number} />
      ))}
    </ul>
  );
};

const Person = (props) => {
  return (
    <li>
      {props.name} {props.number}
    </li>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const onNewName = (event) => {
    setNewName(event.target.value);
  };

  const onNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    if (!persons.find((person) => person.name === newName)) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
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
      <Persons list={listToShow} />
    </div>
  );
};

export default App;