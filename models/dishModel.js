const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const dishSchema = new Schema({
  name: String,
  imgUrl: String,
  price: Number,
  tags: [String],
  ingredients: [String],
  restaurant: { type: ObjectId, ref: 'Restaurant' },
  isSignature: { type: Boolean, default: false },
});

module.exports = mongoose.model('Dish', dishSchema);
