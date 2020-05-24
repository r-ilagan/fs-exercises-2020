const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });

  response.json(users);
});

userRouter.post('/', async (request, response) => {
  const body = request.body;

  if (body.password.length < 3) {
    return response
      .status(400)
      .json({ error: 'password length must be 3 or more characters long' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await newUser.save();
  response.json(savedUser);
});

module.exports = userRouter;
