import React, { useState } from 'react';
import Input from './Input';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleCreate}>
      <Input name="title" value={title} handleChange={setTitle} />
      <Input name="author" value={author} handleChange={setAuthor} />
      <Input name="url" value={url} handleChange={setUrl} />
      <button type="submit" id="create-button">
        create
      </button>
    </form>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
