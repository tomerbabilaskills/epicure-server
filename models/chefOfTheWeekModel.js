const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const chefOfTheWeekSchema = new Schema({
  chef: { type: ObjectId, ref: 'Chef' },
});

module.exports = mongoose.model('ChefOfTheWeek', chefOfTheWeekSchema);
