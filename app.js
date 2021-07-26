const express = require('express');
const mongoose = require('mongoose');
const api = require('./api');

const app = express();

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

app.use(express.json());

mongoose
  .connect(process.env.DB_URL, mongooseOptions)
  .then((result) => console.log('Connected to MongoDB'))
  .catch((error) => console.log(`Connection error: ${error.message}`));

app.use('/api', api);

module.exports = app;
