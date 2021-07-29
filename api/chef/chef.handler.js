const mongoose = require('mongoose');
const chefModel = require('../../models/chefModel');
const restaurantModel = require('../../models/restaurantModel');
const chefOfTheWeekModel = require('../../models/chefOfTheWeekModel');
const dishModel = require('../../models/dishModel');
const { ObjectId } = mongoose.Types;

async function getChefs() {
  try {
    const chefs = await chefModel.find({});
    return chefs;
  } catch (error) {
    throw error;
  }
}

async function getChef(id) {
  try {
    const chef = await chefModel.findById(id);
    return chef;
  } catch (error) {
    throw error;
  }
}

async function createChef({ name, description, imgUrl }) {
  try {
    const newChef = await chefModel.create({ name, description, imgUrl });
    return newChef;
  } catch (error) {
    throw error;
  }
}

async function updateChef(id, data) {
  try {
    const updatedChef = await chefModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedChef;
  } catch (error) {
    throw error;
  }
}

async function deleteChef(id) {
  try {
    const deletedChef = await chefModel.findByIdAndDelete(id);
    const restaurantIds = deletedChef.restaurants;
    await restaurantModel.deleteMany({ chef: ObjectId(id) });
    await dishModel.deleteMany({ restaurant: { $in: restaurantIds } });
  } catch (error) {
    throw error;
  }
}

async function getChefOfTheWeek() {
  try {
    const pipeline = [
      {
        $lookup: {
          from: chefModel.collection.name,
          localField: 'chef',
          foreignField: '_id',
          as: 'chef',
        },
      },
      { $unwind: '$chef' },
      {
        $lookup: {
          from: restaurantModel.collection.name,
          localField: 'chef.restaurants',
          foreignField: '_id',
          as: 'restaurants',
        },
      },
      {
        $project: {
          _id: 1,
          name: '$chef.name',
          description: '$chef.description',
          imgUrl: '$chef.imgUrl',
          restaurants: {
            _id: 1,
            name: 1,
            imgUrl: 1,
          },
        },
      },
    ];
    const chefOfTheWeek = await chefOfTheWeekModel.aggregate(pipeline);
    return chefOfTheWeek[0];
  } catch (error) {
    throw error;
  }
}

async function updateChefOfTheWeek(id) {
  try {
    const updatedChefOfTheWeek = await chefOfTheWeekModel.findOneAndUpdate(
      {},
      { chef: ObjectId(id) },
      { new: true }
    );
    return updatedChefOfTheWeek;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getChefs,
  getChef,
  createChef,
  updateChef,
  deleteChef,
  getChefOfTheWeek,
  updateChefOfTheWeek,
};
