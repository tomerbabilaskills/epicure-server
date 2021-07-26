const { Router } = require('express');
const chefRouter = require('./chefRouter');
const restaurantRouter = require('./restaurantRouter');
const dishRouter = require('./dishRouter');
const seedRouter = require('./seedRouter');

const router = Router();

router.use('/chef', chefRouter);
router.use('/restaurant', restaurantRouter);
router.use('/dish', dishRouter);
router.use('/seed', seedRouter);

module.exports = router;
