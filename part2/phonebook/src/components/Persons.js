import Button from "./Button";

const Persons = (props) => {
  return (
    <ul>
      {props.list.map((person) => (
        <li key={person.id}>
          <Person name={person.name} number={person.number} />
          <Button
            onClick={() => props.onClick(person.id, person.name)}
            text="delete"
          />
        </li>
      ))}
    </ul>
  );
};

const Person = (props) => {
  return (
    <>
      {props.name} {props.number}
    </>
  );
};

export default Persons;
