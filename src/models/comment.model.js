const { loadDB, saveDB } = require('@/utils/jsonDB');

class Comment {
  constructor() {
    this.comments = [];
  }

  async init() {
    this.comments = await loadDB('comments');
  }

  findAll() {
    return this.comments;
  }

  findOne(id) {
    const comment = this.comments.find((comment) => comment.id === id);
    return comment;
  }

  updateOne(id, data) {
    const { content } = data;
    const comment = this.findOne(id);

    if (content) {
      comment.content = content;
    }

    saveDB('comments', this.comments);
    return comment;
  }

  createOne(data) {
    const { postId, content } = data;

    const newComment = {
      id: ++this.comments.length,
      postId,
      content,
      createdAt: Date.now()
    };

    this.comments = [...this.comments, newComment].filter(Boolean);
    saveDB('comments', this.comments);
    return newComment;
  }

  deleteOne(id) {
    this.comments = this.comments.filter((comment) => comment.id !== id);
    saveDB('comments', this.comments);
    return null;
  }
}

const commentModel = new Comment();
commentModel.init();

module.exports = commentModel;
