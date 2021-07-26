const { Router } = require('express');
const dishModel = require('../models/dishModel');

const router = Router();

// [GET] - all dishes
router.get('/', async (req, res) => {
  try {
    const dishes = await dishModel.find({});
    res.json(dishes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// [GET] - dish by id
router.get('/:id', async (req, res) => {
  try {
    const dishId = req.params.id;
    const dish = await dishModel.findById(dishId);
    res.json(dish);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
