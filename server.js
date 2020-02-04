'use strict';


const express = require('express');

const basicAuth =  require('./auth/basic-auth-middleware.js');

const users = require('./auth/user.js');


const app = express();

app.use(express.json());

//**************Routes*******************

app.post('/signup', (req, res) => {
  new users(req.body).save()
  //   console.log(req.body,'req.bodyreq.bodyreq.bodyreq')
  //  console.log('req.body 2' , req.body)
    .then((user) => {

      console.log('user-------',user);
      let token = user.generateToken();
      res.status(200).send(token);
    }).catch(err => console.error(err));
});

app.post('/signin', basicAuth, (req, res) => {
  res.status(200).send(req.token);
});

// app.get('/users', basicAuth, (req, res) => {
//   console.log('kkkkkkkk',(users.find()));
//   res.status(200).json();
// });

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log('MY SERVER IS UP  :', PORT));
  },
};

