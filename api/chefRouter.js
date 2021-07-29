const { Router } = require('express');
const mongoose = require('mongoose');
const chefModel = require('../models/chefModel');
const dishModel = require('../models/dishModel');
const restaurantModel = require('../models/restaurantModel');
const chefOfTheWeekModel = require('../models/chefOfTheWeekModel');

const router = Router();

const { ObjectId } = mongoose.Types;

/* chef of the week routes */

// [GET] - chef of the week
router.get('/chef-of-the-week', async (req, res) => {
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
    return res.json(chefOfTheWeek[0]);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// [PUT] - update chef of the week
router.put('/chef-of-the-week', async (req, res) => {
  const { chefId } = req.body;
  try {
    const updatedChefOfTheWeek = await chefOfTheWeekModel.findOneAndUpdate(
      {},
      { chef: ObjectId(chefId) },
      { new: true }
    );
    return res.json(updatedChefOfTheWeek);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/* chef routes */

// [GET] - all chefs
router.get('/', async (req, res) => {
  try {
    const chefs = await chefModel.find({});
    return res.json(chefs);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// [GET] - chef by id
router.get('/:id', async (req, res) => {
  try {
    const chefId = req.params.id;
    const chef = await chefModel.findById(chefId);
    return res.json(chef);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// [POST] - new chef
router.post('/', async (req, res) => {
  const { imgUrl, description, name } = req.body;
  try {
    if (!imgUrl || !description || !name) {
      return res
        .status(402)
        .send('should provide name, imgUrl and description');
    }
    const newChef = await chefModel.create({ name, description, imgUrl });
    return res.json(newChef);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// [PUT] - update chef
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (!id) res.status(402).send('no chef selected');
    if (!data) res.status(402).send('no data sent');

    const updatedChef = await chefModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return res.json(updatedChef);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// [DELETE] - delete chef
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedChef = await chefModel.findByIdAndDelete(id);
    const restaurantIds = deletedChef.restaurants;
    await restaurantModel.deleteMany({ chef: ObjectId(id) });
    await dishModel.deleteMany({ restaurant: { $in: restaurantIds } });

    return res.send(`chef ${id} and his references deleted successfully`);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
