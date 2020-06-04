import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, currentUser, addLike, removeBlog }) => {
  const [view, setView] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const showInfo = view ? 'hide' : 'view';

  const handleClick = () => {
    setView(!view);
  };

  const displayInfo = { display: view ? '' : 'none' };

  const updateLikes = async () => {
    await addLike(blog);
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={handleClick}>{showInfo}</button>
      <div style={displayInfo}>
        {blog.url}
        <br />
        {`likes ${blog.likes}`} <button onClick={updateLikes}>like</button>
        <br />
        {blog.author}
        {currentUser === blog.user.username ? (
          <div>
            <button onClick={handleRemove}>remove</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default Blog;
