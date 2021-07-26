const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.send('hello restaurant');
});

module.exports = router;
