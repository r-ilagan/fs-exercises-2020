const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');

const Blog = require('../models/blog');
const User = require('../models/user');

describe('When there are some blogs in db', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArrayBlogs = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArrayBlogs);
  });

  describe('User tests', () => {
    beforeEach(async () => {
      await User.deleteMany({});

      const userObjects = helper.initialUsers.map((user) => new User(user));
      const promiseArrayUsers = userObjects.map((user) => user.save());
      await Promise.all(promiseArrayUsers);
    });

    test('Invalid usernames are not created', async () => {
      const usersAtStart = await helper.usersInDb().length;

      const newUser = {
        username: 'ab',
        password: 'secret',
        name: 'Fake user',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain(
        'is shorter than the minimum allowed length (3)'
      );

      const usersAtEnd = await helper.usersInDb().length;

      expect(usersAtEnd).toBe(usersAtStart);
    });

    test('a blog can be deleted by a user', async () => {
      const blogAtStart = await helper.blogsInDb();
      const blogToDelete = blogAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
