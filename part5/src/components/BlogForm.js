import React, { useState } from 'react';
import Input from './Input';

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
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
