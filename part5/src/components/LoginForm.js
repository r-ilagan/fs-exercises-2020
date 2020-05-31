import React from 'react';
import Input from './Input';
import Notification from './Notification';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <h2>log in to application</h2>
      <Notification notification={props.notification} />
      <Input name="username" handleChange={props.setUsername} />
      <Input name="password" type="password" handleChange={props.setPassword} />
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
