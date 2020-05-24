const express = require('express');
const jwt = require('jsonwebtoken');
const blogRouter = express.Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });

  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!request.token || !request.token.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(request.token.id);
  console.log(body, request.token, user);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog.toJSON());
});

blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() === decodedToken.id.toString()) {
    await blog.remove();
    await blog.save();
  }
  response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
  };

  const foundBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(foundBlog.toJSON());
});

module.exports = blogRouter;
