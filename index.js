'use strict';

const server = require ('./server.js');  

const mongoose = require ('mongoose');

const MONGOOSE_URI='mongodb://localhost:27017/dbauth';

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGOOSE_URI, mongooseOptions);

server.start(3000);



















