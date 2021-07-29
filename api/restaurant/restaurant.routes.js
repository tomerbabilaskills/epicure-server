const { Router } = require('express');

const {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require('./restaurant.controller');

const router = Router();

// [GET] - all restaurants
router.get('/', getRestaurants);

// [GET] - restaurant by id
router.get('/:id', getRestaurantById);

// [POST] - new restaurant
router.post('/', createRestaurant);

// [PUT] - update restaurant
router.put('/:id', updateRestaurant);

// [DELETE] - delete restaurant
router.delete('/:id', deleteRestaurant);

module.exports = router;
