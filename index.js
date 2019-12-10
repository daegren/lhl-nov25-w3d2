const PORT = process.env.PORT || 8080;
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');

const postRoutes = require('./routes/posts');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});

