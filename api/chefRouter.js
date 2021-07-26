const { Router } = require('express');
const chefModel = require('../models/chefModel');

const router = Router();

// [GET] - all chefs
router.get('/', async (req, res) => {
  try {
    const chefs = await chefModel.find({});
    res.json(chefs);
  } catch (error) {
    res.status(500).send(error);
  }
});

// [GET] - chef by id
router.get('/:id', async (req, res) => {
  try {
    const chefId = req.params.id;
    const chef = await chefModel.findById(chefId);
    res.json(chef);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
