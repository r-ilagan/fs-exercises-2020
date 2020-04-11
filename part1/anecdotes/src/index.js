import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Display = ({ text }) => {
  return <h1>{text}</h1>;
};

const Vote = ({ anecdote, vote }) => {
  return (
    <p>
      {anecdote} has {vote} votes
    </p>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(
    Array.apply(null, new Array(props.anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  );

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handlePoints = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  const getMostVote = () => {
    let mostVote = 0;
    let index = 0;
    for (let i = 0; i < points.length; i++) {
      if (points[i] > mostVote) {
        mostVote = points[i];
        index = i;
      }
    }
    return index;
  };

  return (
    <div>
      <Display text="Anecdote of the day" />
      <p>{props.anecdotes[selected]}</p>
      <Button handleClick={handlePoints} text="vote" />
      <Button
        handleClick={() =>
          setSelected(getRandomInt(0, props.anecdotes.length - 1))
        }
        text="next anecdote"
      />
      <Display text="Anecdote with most votes" />
      <Vote
        anecdote={props.anecdotes[getMostVote()]}
        vote={points[getMostVote()]}
      />
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
