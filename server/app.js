const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
app.use(morgan('dev'));
app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'index.html'))
);

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

module.exports = app;
