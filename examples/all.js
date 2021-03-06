const getBlob = require("blobs/get-blob");
const getLikes = require("posts/get-likes");
const getPost = require("posts/get-post");
const getPosts = require("posts/get-posts");
const getUser = require("users/get-user");


module.exports = {
  blobs: {
    getBlob: getBlob
  },
  posts: {
    getLikes: getLikes,
    getPost: getPost,
    getPosts: getPosts
  },
  users: {
    getUser: getUser
  }
};