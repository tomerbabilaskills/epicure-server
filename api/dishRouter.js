const { Router } = require('express');
const mongoose = require('mongoose');
const dishModel = require('../models/dishModel');
const restaurantModel = require('../models/restaurantModel');

const router = Router();

const { ObjectId } = mongoose.Types;

// [GET] - all dishes
router.get('/', async (req, res) => {
  try {
    const dishes = await dishModel.find({});
    return res.json(dishes);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// [GET] - dish by id
router.get('/:id', async (req, res) => {
  try {
    const dishId = req.params.id;
    const dish = await dishModel.findById(dishId);
    return res.json(dish);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// [POST] - new dish
router.post('/', async (req, res) => {
  const { imgUrl, price, name, ingredients, tags, isSignature, restaurantId } =
    req.body;
  try {
    const restaurant = ObjectId(restaurantId);

    if (!imgUrl || !price || !name || !ingredients) {
      return res
        .status(402)
        .send('should provide name, imgUrl, price and ingredients');
    }

    if (!(await restaurantModel.exists({ _id: restaurant }))) {
      return res.status(402).send('restaurant is not exist');
    }

    const newDish = await dishModel.create({
      name,
      ingredients,
      tags,
      price,
      imgUrl,
      isSignature,
      restaurant,
    });

    await restaurantModel.findOneAndUpdate(
      { _id: restaurant },
      { $push: { dishes: ObjectId(newDish.id) } }
    );

    return res.json(newDish);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// [PUT] - update dish
router.put('/:id', async (req, res) => {
  // TODO: change a restaurant
  const { id } = req.params;
  const data = req.body;
  try {
    if (!id) res.status(402).send('no dish selected');
    if (!data) res.status(402).send('no data sent');

    const updatedDish = await dishModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.json(updatedDish);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
