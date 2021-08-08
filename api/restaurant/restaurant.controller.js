const handler = require('./restaurant.handler');

async function getRestaurants(req, res) {
  try {
    const restaurants = await handler.getRestaurants();
    res.json(restaurants);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getPopularRestaurants(req, res) {
  try {
    const response = await handler.getPopularRestaurants();
    res.json(response);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getRestaurantById(req, res) {
  const restaurantId = req.params.id;
  try {
    const restaurant = await handler.getRestaurantById(restaurantId);
    res.json(restaurant);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createRestaurant(req, res) {
  const { imgUrl, isPopular, name, chefId } = req.body;
  try {
    if (!imgUrl || !name || !chefId) {
      return res.status(402).send('should provide name, imgUrl and chefId');
    }

    const newRestaurant = await handler.createRestaurant(chefId, {
      name,
      isPopular,
      imgUrl,
    });

    return res.send(newRestaurant);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updateRestaurant(req, res) {
  const { id } = req.params;
  const data = req.body;
  try {
    if (!id) res.status(402).send('no restaurant selected');
    if (!data) res.status(402).send('no data sent');

    const updatedRestaurant = await handler.updateRestaurant(id, data);

    res.json(updatedRestaurant);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteRestaurant(req, res) {
  const { id } = req.params;
  try {
    await handler.deleteRestaurant(id);
    return res.send(`restaurant ${id} and its dishes deleted successfully`);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getRestaurants,
  getRestaurantById,
  getPopularRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
