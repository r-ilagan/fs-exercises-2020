import React from 'react';
import Parts from './Part';

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Parts key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <h4>
        total of {parts.reduce((acc, part) => acc + part.exercises, 0)}{' '}
        exercises
      </h4>
    </div>
  );
};

export default Content;
