const { postModel, commentModel } = require('@/models');

const getAll = (_, res) => {
  const comments = commentModel.findAll();
  res.success(comments, 200);
};

const getOne = (req, res) => {
  const comment = commentModel.findOne(+req.params.id);
  if (!comment) {
    return res.error(new Error('Resource not found'), 404);
  }

  res.success(comment, 200);
};

const createOne = (req, res) => {
  if (!req.body.content || !req.body.postId) {
    return res.error(new Error('Content and PostId is required'), 422);
  }

  const post = postModel.findOne(req.body.postId);
  if (!post) {
    return res.error(new Error('Post not found'), 404);
  }

  const comment = commentModel.createOne(req.body);
  res.success(comment, 201);
};

const updateOne = (req, res) => {
  const commentId = +req.params.id;

  if (!req.body.postId) {
    return res.error(new Error('PostId is required'), 422);
  }

  const comment = commentModel.findOne(commentId);
  if (!comment) {
    return res.error(new Error('Resource not found'), 404);
  }

  const post = postModel.findOne(req.body.postId);
  if (!post) {
    return res.error(new Error('Post not found'), 404);
  }

  const commentUpdated = commentModel.updateOne(commentId, req.body);
  res.success(commentUpdated, 200);
};

const deleteOne = (req, res) => {
  const postId = +req.params.id;

  const comment = commentModel.findOne(postId);
  if (!comment) {
    return res.error(new Error('Resource not found'), 404);
  }

  commentModel.deleteOne(postId);
  res.success(undefined, 200);
};

const commentController = { getAll, getOne, createOne, updateOne, deleteOne };

module.exports = commentController;
