'use strict';

const express = require('express');
const basicAuth = require('./auth/basic-auth-middleware.js');
const users = require('./auth/user.js');

const app = express();

app.use(express.json());

app.post('/signup', (req, res) => {
  users.save(req.body)
    .then(user => {
      let token = users.generateToken(user);
      res.status(200).send(token);
    })
});

app.post('/signin', basicAuth, (req, res) => {
  res.status(200).send(req.token);
});

app.get('/users', basicAuth, (req, res) => {
  res.status(200).json(users.list());
});

module.exports = {
    server: app,
    start: port => {
      let PORT = port || process.env.PORT || 3000;
      app.listen(PORT, () => console.log('server up:', PORT));
    }
  }