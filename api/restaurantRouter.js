const { Router } = require('express');
const mongoose = require('mongoose');
const chefModel = require('../models/chefModel');
const dishModel = require('../models/dishModel');
const restaurantModel = require('../models/restaurantModel');

const router = Router();

const { ObjectId } = mongoose.Types;

// [GET] - all restaurants
router.get('/', async (req, res) => {
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
    res.json(restaurants);
  } catch (error) {
    res.status(500).send(error);
  }
});

// [GET] - restaurant by id
router.get('/:id', async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await restaurantModel.findById(restaurantId);
    res.json(restaurant);
  } catch (error) {
    res.status(500).send(error);
  }
});

// [POST] - new restaurant
router.post('/', async (req, res) => {
  const { imgUrl, isPopular, name, chefId } = req.body;
  try {
    const chef = ObjectId(chefId);

    if (!imgUrl || !name || !chefId) {
      return res.status(402).send('should provide name, imgUrl and chefId');
    }

    if (!(await chefModel.exists({ _id: chef }))) {
      return res.status(402).send('chef is not exist');
    }

    const newRestaurant = await restaurantModel.create({
      name,
      isPopular,
      imgUrl,
      chef,
    });

    await chefModel.findOneAndUpdate(
      { _id: chef },
      { $push: { restaurants: ObjectId(newRestaurant.id) } }
    );

    return res.send(newRestaurant);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// [PUT] - update restaurant
router.put('/:id', async (req, res) => {
  // TODO: change a chef
  const { id } = req.params;
  const data = req.body;
  try {
    if (!id) res.status(402).send('no restaurant selected');
    if (!data) res.status(402).send('no data sent');

    const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    res.json(updatedRestaurant);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// [DELETE] - delete restaurant
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await restaurantModel.findByIdAndDelete(id);
    await dishModel.deleteMany({ restaurant: ObjectId(id) });

    return res.send(`restaurant ${id} and its dishes deleted successfully`);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
