const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const dishSchema = new Schema({
  name: String,
  ingredients: [String],
  imgUrl: String,
  restaurantId: { type: ObjectId, ref: 'Restaurant' },
  tags: [String],
  price: Number,
});

module.exports = mongoose.model('Dish', dishSchema);
