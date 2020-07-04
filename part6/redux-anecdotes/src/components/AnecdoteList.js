import React from 'react';
import Filter from '../components/Filter';
import Notification from '../components/Notification';
import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { clearMessage, setMessage } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const notification = useSelector((state) => state.notification);
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => 
    state.anecdotes.filter((anecdote) => 
    anecdote.content.toLowerCase().includes(filter.toLowerCase()
    ))
  );

  const compare = (a, b) => {
    if (a.votes > b.votes) return -1;
    if (a.votes < b.votes) return 1;
    return 0;
  };
  anecdotes.sort(compare);
  const dispatch = useDispatch();

  return (
    <>
      <h2>Anecdotes</h2>
      {notification && <Notification />}
      <Filter />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(vote(anecdote.id));
                dispatch(setMessage(`you voted '${anecdote.content}'`));
                setTimeout(() => dispatch(clearMessage()), 5000);
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
