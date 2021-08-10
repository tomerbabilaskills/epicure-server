const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const api = require('./api');

const app = express();

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

app.use(express.json());
app.use(cors());

console.log(process.env.DB_URL);

mongoose
  .connect(
    'mongodb+srv://tomerbabila:tomer123@cluster0.ccswr.mongodb.net/epicure?retryWrites=true&w=majority',
    mongooseOptions
  )
  .then((result) => console.log('Connected to MongoDB'))
  .catch((error) => console.log(`Connection error: ${error.message}`));

app.use('/api', api);

module.exports = app;
