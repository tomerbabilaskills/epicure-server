const { Router } = require('express');
const chefRouter = require('./chefRouter');
const restaurantRouter = require('./restaurantRouter');
const dishRouter = require('./dishRouter');

const router = Router();

router.use('/chef', chefRouter);
router.use('/restaurant', restaurantRouter);
router.use('/dish', dishRouter);

module.exports = router;
