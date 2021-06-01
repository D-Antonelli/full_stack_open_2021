import React, { useState } from "react";

const MostVoted = ({ anecdotes, points }) => {
  const max = Math.max(...points);
  const index = points.indexOf(max);
  let voteResult;
  if (max === 0) {
    voteResult = <p>No votes received yet</p>;
  } else {
    voteResult = (
      <>
        <p>{anecdotes[index]}</p>
        <p>has {max} votes</p>
      </>
    );
  }
  return (
    <>
      <h1>Anecdote with most votes</h1>
      {voteResult}
    </>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  function setRandomIndex() {
    let random;
    //do not select the same anectode as previous
    do {
      random = Math.floor(Math.random() * anecdotes.length);
    } while (random === selected);
    setSelected(random);
  }

  function vote() {
    const copy = [...points];
    copy[selected]++;
    setPoints(copy);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button onClick={vote} text="vote" />
      <Button onClick={setRandomIndex} text="next anecdote" />
      <MostVoted anecdotes={anecdotes} points={points} />
    </div>
  );
};

export default App;
