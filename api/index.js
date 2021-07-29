const { Router } = require('express');
const chefRouter = require('./chef/chef.routes');
const restaurantRouter = require('./restaurant/restaurant.routes');
const dishRouter = require('./dish/dish.routes');
const seedRouter = require('./seedRouter');

const router = Router();

router.use('/chef', chefRouter);
router.use('/restaurant', restaurantRouter);
router.use('/dish', dishRouter);
router.use('/seed', seedRouter);

module.exports = router;
