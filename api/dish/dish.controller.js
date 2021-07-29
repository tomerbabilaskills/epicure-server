const handler = require('./dish.handler');

async function getDishes(req, res) {
  try {
    const dishes = await handler.getDishes();
    res.json(dishes);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getDishById(req, res) {
  const dishId = req.params.id;
  try {
    const dish = await handler.getDishById(dishId);
    res.json(dish);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createDish(req, res) {
  const { imgUrl, price, name, ingredients, tags, isSignature, restaurantId } =
    req.body;
  try {
    if (!imgUrl || !price || !name || !ingredients) {
      return res
        .status(402)
        .send('should provide name, imgUrl, price and ingredients');
    }

    const newDish = await handler.createDish(restaurantId, {
      imgUrl,
      price,
      name,
      ingredients,
      tags,
      isSignature,
    });

    return res.send(newDish);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updateDish(req, res) {
  const { id } = req.params;
  const data = req.body;
  try {
    if (!id) res.status(402).send('no dish selected');
    if (!data) res.status(402).send('no data sent');

    const updatedDish = await handler.updateDish(id, data);

    res.json(updatedDish);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteDish(req, res) {
  const { id } = req.params;
  try {
    await handler.deleteDish(id);

    return res.send(`dish ${id} deleted successfully`);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = { getDishes, getDishById, createDish, updateDish, deleteDish };
