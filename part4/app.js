const express = require('express');
const app = express();
require('express-async-errors');
const config = require('./utils/config');
const cors = require('cors');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blog');
const loginRouter = require('./controllers/login');
const userRouter = require('./controllers/user');

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(middleware.errorHandler);

module.exports = app;
