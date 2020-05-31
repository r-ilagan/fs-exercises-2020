import React, { useState } from 'react';
import Input from './Input';
import blogService from '../services/blogs';

const BlogForm = ({ blogs, setBlogs, notifyWith }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = async (event) => {
    try {
      event.preventDefault();
      const blog = {
        title,
        author,
        url,
      };
      const returnedBlog = await blogService.create(blog);
      setBlogs(blogs.concat(returnedBlog));
      setTitle('');
      setAuthor('');
      setUrl('');
      notifyWith(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} has beed added`
      );
    } catch (exception) {
      notifyWith(exception.message, 'error');
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <Input name="title" handleChange={setTitle} />
      <Input name="author" handleChange={setAuthor} />
      <Input name="url" handleChange={setUrl} />
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
