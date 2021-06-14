const Suggestions = ({ data, onClick }) => {
  return data.map((each) => (
    <div key={each.name}>
      <Suggestion data={each} />
      <Button onClick={() => onClick(each.name)} text="show" />
    </div>
  ));
};

const Button= ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Suggestion = ({ data }) => {
  return <span>{data.name}</span>;
};

export default Suggestions;