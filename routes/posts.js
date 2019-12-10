const express = require('express');

let postsDB = [
  { id: 1, title: 'Super Cool Blog Post', content: 'This is some really cool content' },
  { id: 2, title: 'Best Cookie recipe ever!', content: 'Just make some good cookies!' },
  { id: 3, title: 'How to organize your rubber ducks', content: 'Just place them in a row' }
];

const router = new express.Router();

// INDEX - GET /posts
router.get('/', (req, res) => {
  res.render('posts/index', { posts: postsDB });
});

// SHOW - GET /posts/:id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const post = postsDB.filter(post => post.id === id)[0];

  if (post) {
    res.render('posts/show', { post });
  } else {
    res.status(404).send(`Post with id ${id} not found.`);
  }
});

module.exports = router;
