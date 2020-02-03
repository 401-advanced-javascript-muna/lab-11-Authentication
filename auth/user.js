'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const MONGOOSE_URI='mongodb://localhost:27017/dbauth';

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGOOSE_URI, mongooseOptions);
let SECRET = "secret123" ;

//  our schema 
const users = new mongoose.Schema({
    username: { type: String, required: true ,unique: true},
    password: { type: String, required: true }
  
  });
//   Hash the plain text password given before you save a user to the database
users.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 5);
  });
  //   Method to authenticate a user using the hashed password
  users.authenticateBasic = async function(user , password){
    foundUser = await this.findOne({username: user});
    if (foundUser) {
    let valid = bcrypt.compare(password, foundUser.password);
    return valid ? foundUser.username : Promise.reject();
    }else {
        Promise.reject();
    }
  }
  

//   Method to generate a Token following a valid login
  users.generateToken = function(user) {
    // let token = jwt.sign({ id: this._id  }, SECRET);
    let token = jwt.sign({ username: user.username}, SECRET);
    return token;
  }

  module.exports = mongoose.model('users', users);




