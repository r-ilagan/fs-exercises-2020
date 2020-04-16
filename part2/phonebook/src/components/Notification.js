import React from 'react';

const Notification = ({ message, isError }) => {
  const errorCss = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textColor: 'red',
  };

  const notification = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const messageClass = isError ? errorCss : notification;

  if (message === null) return null;
  return <div style={messageClass}>{message}</div>;
};

export default Notification;
