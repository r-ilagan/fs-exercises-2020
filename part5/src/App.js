import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = window.localStorage.getItem('loggedInUser');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const notifyWith = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      notifyWith('wrong username or password', 'error');
    }
  };

  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const showBlogs = () => {
    return (
      <>
        <h2>blogs</h2>
        <Notification notification={notification} />
        <p>
          {`${user.name} is logged in`}
          <button onClick={logout}>logout</button>
        </p>
        <div>
          <h2>create new</h2>
          <BlogForm blogs={blogs} setBlogs={setBlogs} notifyWith={notifyWith} />
        </div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    );
  };

  return (
    <div>
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          notification={notification}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        showBlogs()
      )}
    </div>
  );
};

export default App;
