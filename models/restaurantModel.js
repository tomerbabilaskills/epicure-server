const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const restaurantSchema = new Schema({
  name: String,
  imgUrl: String,
  chefId: { type: ObjectId, ref: 'Chef' },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
