'use strict ';

const Model = require('./model');
const schema = require('./schema');

class Users extends Model{
  constructor(){
    super(schema);
  }

}

module.exports = Users;