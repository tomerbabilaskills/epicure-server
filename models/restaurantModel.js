const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const restaurantSchema = new Schema({
  name: String,
  imgUrl: String,
  chef: { type: ObjectId, ref: 'Chef' },
  dishes: [{ type: ObjectId, ref: 'Dish' }],
  isPopular: { type: Boolean, default: false },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
