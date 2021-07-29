const { Router } = require('express');

const {
  getDishes,
  getDishById,
  createDish,
  updateDish,
  deleteDish,
} = require('./dish.controller');

const router = Router();

// [GET] - all dishes
router.get('/', getDishes);

// [GET] - dish by id
router.get('/:id', getDishById);

// [POST] - new dish
router.post('/', createDish);

// [PUT] - update dish
router.put('/:id', updateDish);

// [DELETE] - delete dish
router.delete('/:id', deleteDish);

module.exports = router;
