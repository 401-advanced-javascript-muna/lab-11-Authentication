/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
'use strict ';

const express = require('express');
const router = express.Router();
const basicAuth = require('../auth/basic-auth-middleware');
const users = require('../auth/user');


router.post('/signup', signUp);
router.post('/signin', basicAuth, signIn);
router.get('/users',basicAuth, getUsers);

//// /sign up
function signUp  (req, res , next){
  new users(req.body).save()
    .then((user) => {
      let token = user.generateToken();
      res.status(200).send(token);
    }).catch(err => console.error(err));
}
///// sign in
function signIn(req, res , next){
  res.status(200).send(req.token);

}
///////// user
function getUsers(req , res , next){

  users.find()
    .then(records =>{
      res.status(200).send(records );
    });
}
module.exports = router;