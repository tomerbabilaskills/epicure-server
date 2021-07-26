const { Router } = require('express');
const restaurantModel = require('../models/restaurantModel');

const router = Router();

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

module.exports = router;
