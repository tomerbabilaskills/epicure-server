const mongoose = require('mongoose');
const { Schema } = mongoose;

const chefSchema = new Schema({
  name: String,
  description: String,
  imgUrl: String,
});

module.exports = mongoose.model('Chef', chefSchema);
