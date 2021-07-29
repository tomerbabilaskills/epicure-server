const handler = require('./chef.handler');

async function getChefs(req, res) {
  try {
    const response = await handler.getChefs();
    res.json(response);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getChefById(req, res) {
  const chefId = req.params.id;
  try {
    const response = await handler.getChef(chefId);
    res.json(response);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createChef(req, res) {
  const { imgUrl, description, name } = req.body;
  try {
    if (!imgUrl || !description || !name) {
      return res
        .status(402)
        .send('should provide name, imgUrl and description');
    }
    const newChef = await handler.createChef({ name, description, imgUrl });
    return res.json(newChef);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updateChef(req, res) {
  const { id } = req.params;
  const data = req.body;
  try {
    if (!id) res.status(402).send('no chef selected');
    if (!data) res.status(402).send('no data sent');
    const updatedChef = await handler.updateChef(id, data);
    return res.json(updatedChef);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteChef(req, res) {
  const { id } = req.params;
  try {
    await handler.deleteChef(id);
    return res.send(`chef ${id} and his references deleted successfully`);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function getChefOfTheWeek(req, res) {
  try {
    const chefOfTheWeek = await handler.getChefOfTheWeek();
    return res.json(chefOfTheWeek);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updateChefOfTheWeek(req, res) {
  const { chefId } = req.body;
  try {
    const updatedChefOfTheWeek = await handler.updateChefOfTheWeek(chefId);
    return res.json(updatedChefOfTheWeek);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getChefs,
  getChefById,
  createChef,
  updateChef,
  deleteChef,
  getChefOfTheWeek,
  updateChefOfTheWeek,
};
