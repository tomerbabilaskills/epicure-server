const mongoose = require('mongoose');
const chefModel = require('../../models/chefModel');
const restaurantModel = require('../../models/restaurantModel');
const dishModel = require('../../models/dishModel');

const { ObjectId } = mongoose.Types;

async function getRestaurants() {
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
        $project: {
          _id: 1,
          name: 1,
          imgUrl: 1,
          description: '$chef.name',
        },
      },
    ];
    const restaurants = await restaurantModel.aggregate(pipeline);
    return restaurants;
  } catch (error) {
    throw error;
  }
}

async function getRestaurantById(id) {
  try {
    const restaurant = await restaurantModel.findById(id);
    return restaurant;
  } catch (error) {
    throw error;
  }
}

async function getPopularRestaurants() {
  try {
    const pipeline = [
      { $match: { isPopular: true } },
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
        $project: {
          _id: 1,
          name: 1,
          imgUrl: 1,
          description: '$chef.name',
        },
      },
    ];
    const restaurants = await restaurantModel.aggregate(pipeline);
    return restaurants;
  } catch (error) {
    throw error;
  }
}

async function createRestaurant(chefId, data) {
  const chef = ObjectId(chefId);
  try {
    if (await chefModel.exists({ _id: chef })) {
      const newData = data;
      newData.chef = chef;

      const newRestaurant = await restaurantModel.create(newData);

      await chefModel.findOneAndUpdate(
        { _id: chef },
        { $push: { restaurants: ObjectId(newRestaurant.id) } }
      );

      return newRestaurant;
    }
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateRestaurant(id, data) {
  try {
    const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
    return updatedRestaurant;
  } catch (error) {
    throw error;
  }
}

async function deleteRestaurant(id) {
  try {
    const deletedRestaurant = await restaurantModel.findByIdAndDelete(id);
    const chefId = ObjectId(deletedRestaurant.chef);
    await dishModel.deleteMany({ restaurant: ObjectId(id) });
    await chefModel.findByIdAndUpdate(chefId, {
      $pullAll: { restaurants: [ObjectId(id)] },
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRestaurants,
  getRestaurantById,
  getPopularRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
