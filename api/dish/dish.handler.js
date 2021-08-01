const mongoose = require('mongoose');
const dishModel = require('../../models/dishModel');
const restaurantModel = require('../../models/restaurantModel');

const { ObjectId } = mongoose.Types;

async function getDishes() {
  try {
    const pipeline = [
      { $match: { isSignature: true } },
      {
        $lookup: {
          from: restaurantModel.collection.name,
          localField: 'restaurant',
          foreignField: '_id',
          as: 'restaurant',
        },
      },
      { $unwind: '$restaurant' },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          tags: 1,
          description: '$ingredients',
          imgUrl: 1,
          restaurant: '$restaurant.name',
        },
      },
    ];
    const dishes = await dishModel.aggregate(pipeline);
    return dishes;
  } catch (error) {
    throw error;
  }
}

async function getDishById(id) {
  try {
    const dish = await dishModel.findById(id);
    return dish;
  } catch (error) {
    throw error;
  }
}

async function createDish(restaurantId, data) {
  const restaurant = ObjectId(restaurantId);
  try {
    if (await restaurantModel.exists({ _id: restaurant })) {
      const newData = data;
      newData.restaurant = restaurant;

      const newDish = await dishModel.create(newData);

      await restaurantModel.findOneAndUpdate(
        { _id: restaurant },
        { $push: { dishes: ObjectId(newDish.id) } }
      );

      return newDish;
    }
    return;
  } catch (error) {
    throw error;
  }
}

async function updateDish(id, data) {
  try {
    const updatedDish = await dishModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedDish;
  } catch (error) {
    throw error;
  }
}

async function deleteDish(id) {
  try {
    const deletedDish = await dishModel.findByIdAndDelete(id);
    const restaurantId = ObjectId(deletedDish.restaurant);
    await restaurantModel.findByIdAndUpdate(restaurantId, {
      $pullAll: { dishes: [ObjectId(id)] },
    });
  } catch (error) {
    throw error;
  }
}

module.exports = { getDishes, getDishById, createDish, updateDish, deleteDish };
