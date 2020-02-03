'use strict';

const base64 = require('base-64');
const users = require('./user');

module.exports = (req, res, next) => {

  if(!req.headers.authorization) { next('invalid login'); return; }

  let basic = req.headers.authorization.split(' ').pop(); //username and password just //let basic = req.headers.authorization.split(':')[1]; 
  console.log('req auth headers:', req.headers.authorization);
  console.log('basic:', basic);

//   let [user, password] = base64.decode(basic).split(':'); //[username ,password]  //

//   console.log('decoded user/pw', [user, password]);

  users.authenticateBasic(user, password)
    .then(validUser => {
      req.token = users.generateToken(validUser);
      console.log('token:', req.token);
      next();
    }).catch( err => next('invalid login'));
}