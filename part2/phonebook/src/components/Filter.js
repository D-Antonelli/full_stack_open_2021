const Filter = (props) => {
  return (
    <>
      filter shown with
      <input value={props.value} onChange={props.onChange} />
    </>
  );
};

export default Filter;