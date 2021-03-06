import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const user = window.localStorage.getItem('loggedInUser');
    if (user) {
      const loggedUser = JSON.parse(user);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const notifyWith = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
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

  const addBlog = async (blog) => {
    try {
      const returnedBlog = await blogService.create(blog);
      notifyWith(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} has beed added`
      );
      setBlogs(blogs.concat(returnedBlog));
    } catch (exception) {
      notifyWith('Title, author and url are required', 'error');
    }
  };

  const updateLikes = async (blog) => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    });
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id);
      notifyWith('Successfully deleted blog');
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (exception) {
      notifyWith('Could not delete blog', 'error');
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
        <Togglable buttonLabel="new note">
          <h2>create new</h2>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            currentUser={user.username}
            addLike={updateLikes}
            removeBlog={deleteBlog}
          />
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
