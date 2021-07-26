const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const chefSchema = new Schema({
  name: String,
  imgUrl: String,
  description: String,
  restaurants: [{ type: ObjectId, ref: 'Restaurant' }],
  isChefOfTheWeek: { type: Boolean, default: false },
});

module.exports = mongoose.model('Chef', chefSchema);
