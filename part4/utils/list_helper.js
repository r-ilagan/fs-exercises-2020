const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (acc, blog) => {
    return acc + blog.likes;
  };

  return Object.keys(blogs).length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  let mostLike = {};
  let favorite = -1;

  for (const blog of blogs) {
    if (favorite < blog.likes) {
      mostLike = { ...blog };
      favorite = blog.likes;
    }
  }

  return blogs.length === 0
    ? {}
    : {
        title: mostLike.title,
        author: mostLike.author,
        likes: mostLike.likes,
      };
};

const mostBlogs = (blogs) => {
  return _.isEmpty(blogs)
    ? {}
    : _.pick(_.maxBy(blogs, 'blogs'), ['author', 'blogs']);
};

const mostLikes = (blogs) => {
  return _.isEmpty(blogs)
    ? {}
    : _.pick(_.maxBy(blogs, 'likes'), ['author', 'likes']);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
