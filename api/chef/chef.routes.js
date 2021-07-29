const { Router } = require('express');

const {
  getChefs,
  getChefById,
  createChef,
  updateChef,
  deleteChef,
  getChefOfTheWeek,
  updateChefOfTheWeek,
} = require('./chef.controller');

const router = Router();

/* chef of the week routes */

// [GET] - chef of the week
router.get('/chef-of-the-week', getChefOfTheWeek);

// [PUT] - update chef of the week
router.put('/chef-of-the-week', updateChefOfTheWeek);

/* chef routes */

// [GET] - all chefs
router.get('/', getChefs);

// [GET] - chef by id
router.get('/:id', getChefById);

// [POST] - new chef
router.post('/', createChef);

// [PUT] - update chef
router.put('/:id', updateChef);

// [DELETE] - delete chef
router.delete('/:id', deleteChef);

module.exports = router;
