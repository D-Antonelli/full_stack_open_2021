import Button from "./Button";

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
        <Button type="submit" text="add"/>
      </div>
    </form>
  );
};


export default PersonForm;
