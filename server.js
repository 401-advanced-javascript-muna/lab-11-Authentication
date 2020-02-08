


const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// const basicAuth =  require('./auth/basic-auth-middleware.js');

const userRoute = require('./routes/users-route');

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use(userRoute);
///////////////////////////////
module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log('MY SERVER IS UP  :', PORT));
  },
};

