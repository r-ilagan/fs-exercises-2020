const bcrypt = require('bcrypt');
const Blog = require('../models/blog');
const User = require('../models/user');

const getPasswordHash = async () => await bcrypt.hash('secret', 10);

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'Plop',
    url: 'plop.com/1',
    likes: 42,
  },
  {
    title: 'Game Dev First Blog',
    author: 'Guski',
    url: 'guski.dev/1',
    likes: 52,
  },
];

const initialUsers = [
  {
    username: 'plop',
    password: 'secret',
    name: 'Plop Lop',
    passwordHash: getPasswordHash().toString(),
  },
  {
    username: 'guski',
    password: 'secret',
    name: 'Guski',
    passwordHash: getPasswordHash().toString(),
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'fake blog',
    author: 'No one',
    url: 'fake.come',
  });

  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});

  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});

  return users.map((u) => u.toJSON());
};

module.exports = {
  nonExistingId,
  blogsInDb,
  initialBlogs,
  initialUsers,
  usersInDb,
};
