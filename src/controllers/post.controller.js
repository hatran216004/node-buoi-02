const { postModel } = require('@/models');

const getAll = (_, res) => {
  const posts = postModel.findAll();
  res.success(posts, 200);
};

const getOne = (req, res) => {
  const post = postModel.findOne(+req.params.id);
  if (!post) {
    return res.error(new Error('Resource not found'), 404);
  }

  res.success(post, 200);
};

const createOne = (req, res) => {
  if (!req.body.title || !req.body.content) {
    return res.error(new Error('Title and Content is required'), 422);
  }

  const post = postModel.createOne(req.body);
  res.success(post, 201);
};

const updateOne = (req, res) => {
  const postId = +req.params.id;

  const post = postModel.findOne(postId);
  if (!post) {
    return res.error(new Error('Resource not found'), 404);
  }

  const postUpdated = postModel.updateOne(postId, req.body);
  res.success(postUpdated, 200);
};

const deleteOne = (req, res) => {
  const postId = +req.params.id;

  const post = postModel.findOne(postId);
  if (!post) {
    return res.error(new Error('Resource not found'), 404);
  }

  postModel.deleteOne(postId);
  res.success(undefined, 200);
};

const postController = { getAll, getOne, createOne, updateOne, deleteOne };

module.exports = postController;
