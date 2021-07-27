const { Router } = require('express');
const mongoose = require('mongoose');
const chefModel = require('../models/chefModel');
const restaurantModel = require('../models/restaurantModel');

const router = Router();

const { ObjectId } = mongoose.Types;

// [GET] - all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
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

module.exports = router;
