import React, { useState } from 'react';

const Blog = ({ blog, addLike }) => {
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
      </div>
    </div>
  );
};

export default Blog;
