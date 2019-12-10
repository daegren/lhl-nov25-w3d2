const express = require('express');

let postsDB = [
  { id: 1, title: 'Super Cool Blog Post', content: 'This is some really cool content' },
  { id: 2, title: 'Best Cookie recipe ever!', content: 'Just make some good cookies!' },
  { id: 3, title: 'How to organize your rubber ducks', content: 'Just place them in a row' }
];
let nextId = 4;

const createPost = (title, content) => {
  const newPost = {
    id: nextId++,
    title, content
  };

  postsDB.push(newPost);

  return newPost;
};

const getPost = id =>
  postsDB.filter(post => post.id === id)[0];

const updatePost = (id, title, content) => {
  postsDB.forEach(post => {
    if (post.id === id) {
      post.title = title;
      post.content = content;
    }
  });
};

const deletePost = id => {
  postsDB = postsDB.filter(post => post.id !== id);
};

const router = new express.Router();

// INDEX - GET /posts
router.get('/', (req, res) => {
  res.render('posts/index', { posts: postsDB });
});

// CREATE - GET /posts/new
router.get('/new', (req, res) => {
  res.render('posts/new');
});

// CREATE - POST /posts
router.post('/', (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  if (!title || !content) {
    res.status(422).send('Please make sure you include both a title and content');
    return;
  }

  const post = createPost(title, content);

  res.redirect(`/posts/${post.id}`);
});

// SHOW - GET /posts/:id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const post = getPost(id);

  if (post) {
    res.render('posts/show', { post });
  } else {
    res.status(404).send(`Post with id ${id} not found.`);
  }
});

// UPDATE - GET /posts/:id/edit
router.get('/:id/edit', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const post = getPost(id);

  if (post) {
    res.render('posts/edit', { post });
  } else {
    res.status(404).send(`Post with id ${id} not found.`);
  }
});

// UPDATE - PUT /posts/:id
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const post = getPost(id);

  if (!post) {
    res.status(404).send(`Post with id ${id} not found.`);
    return;
  }

  const title = req.body.title;
  const content = req.body.content;

  if (!title || !content) {
    res.status(422).send('Please make sure you include both a title and content');
    return;
  }

  updatePost(post.id, title, content);

  res.redirect(`/posts/${post.id}`);
});

// DELETE - DELETE /posts/:id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  deletePost(id);

  res.redirect('/posts');
});

module.exports = router;
