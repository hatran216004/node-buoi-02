const { loadDB, saveDB } = require('../../utils/jsonDB');

class Post {
  constructor() {
    this.posts = [];
  }

  async init() {
    this.posts = await loadDB('posts');
  }

  findAll() {
    return this.posts;
  }

  findOne(id) {
    const post = this.posts.find((post) => post.id === id);
    return post;
  }

  updateOne(id, data) {
    const { title, content } = data;
    const post = this.findOne(id);

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    saveDB('posts', this.posts);
    return post;
  }

  createOne(data) {
    const { title, content } = data;

    const newPost = {
      id: ++this.posts.length,
      title,
      content,
      createdAt: Date.now()
    };

    this.posts = [...this.posts, newPost].filter(Boolean);
    saveDB('posts', this.posts);

    return newPost;
  }

  deleteOne(id) {
    this.posts = this.posts.filter((post) => post.id !== id);
    saveDB('posts', this.posts);
    return null;
  }
}

const postModel = new Post();
postModel.init();

module.exports = postModel;
