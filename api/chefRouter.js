const { Router } = require('express');
const chefModel = require('../models/chefModel');

const router = Router();

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

    res.json(updatedChef);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
