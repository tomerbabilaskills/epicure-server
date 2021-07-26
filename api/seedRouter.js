const { Router } = require('express');
const chefModel = require('../models/chefModel');
const dishModel = require('../models/dishModel');
const restaurantModel = require('../models/restaurantModel');

const router = Router();

const mockData = {
  chefs: [
    {
      name: 'Yossi Shitrit',
      description: `Chef Yossi Shitrit has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav Udim. Shitrit's creativity and culinary acumen born of long experience are expressed in the every detail of each and every dish.`,
      imgUrl: '../../../assets/images/chef.jpg',
      isChefOfTheWeek: true,
    },
    {
      name: 'Meir Adoni',
      description: `Chef Meir is a gentleman driven by passion, and innovative creation. He is owning three, Tel Aviv based restaurants, Catit, Mizlaia and Blue Sky, wherein he also directs and creates catered events, participates in Television Shows, authors books, and is known worldwide as the Gastronomic leader of Israel, lecturing and providing mentorship.`,
      imgUrl: '../../../assets/images/chef.jpg',
    },
    {
      name: 'Ran Shmueli',
      description: `Chef Ran Shmueli, one of Israel’s most respected veteran chefs, is an entrepreneur, innovator and creative visionary in Israeli cuisine. Additional culinary ventures by Shmueli include Ma’arava, a venue for large events at Kibbutz Ga’ash, and Shmueli Catering which, for the past 28 years, has specialized in high-end productions and the development of gastronomic concepts.`,
      imgUrl: '../../../assets/images/chef.jpg',
    },
    {
      name: 'Yanir Green',
      description: `Chef Yanir Green is one of Israel’s most respected veteran chefs. He is also one of the founders of restaurants in Sarona and Ramat Hahayal.`,
      imgUrl: '../../../assets/images/chef.jpg',
    },
  ],
  restaurants: [
    {
      name: 'Claro',
      imgSrc: '../../assets/images/restaurants/claro.jpg',
      isPopular: true,
    },
    {
      name: 'Lumina',
      imgSrc: '../../assets/images/restaurants/mizlala-gret-mullet-fillet.jpg',
      isPopular: true,
    },
    {
      name: 'Tiger Lilly',
      imgSrc: '../../assets/images/restaurants/tiger-lili.jpg',
      isPopular: true,
    },
    {
      name: 'Ozna',
      imgSrc: '../../../assets/images/restaurants/ozna.jpg',
    },
    {
      name: 'Kitchen Market',
      imgSrc: '../../../assets/images/restaurants/kitchen-market.jpg',
    },
    {
      name: 'Mashya',
      imgSrc: '../../../assets/images/restaurants/mashya.jpg',
    },
  ],
  dishes: [
    {
      name: 'Pad Ki Mao',
      ingredients: [
        'Shrimps',
        'Glass Noodles',
        'Kemiri Nuts',
        'Shallots',
        'Lemon Grass',
        'Magic Chili Brown Coconut',
      ],
      price: 88,
      tags: ['spicy'],
      imgSrc: '../../assets/images/dishes/pad-ki-mao.jpg',
      isSignature: true,
    },
    {
      name: 'Garbanzo Frito',
      ingredients: [
        'Polenta Fingers',
        'Veal Cheek',
        'Magic Chili Cured Lemoncream',
        'Yellow Laksa',
      ],
      price: 98,
      tags: [],
      imgSrc: '../../assets/images/dishes/garbanzo.jpg',
      isSignature: true,
    },
    {
      name: 'Smoked Pizza',
      ingredients: [
        'Basil Dough',
        'Cashew "Butter"',
        'Demi-glace',
        'Bison & Radish',
      ],
      price: 65,
      tags: ['vegan'],
      imgSrc: '../../assets/images/dishes/pizza.jpg',
      isSignature: true,
    },
  ],
};

router.post('/', async (req, res) => {
  try {
    const newChefs = await chefModel.create(mockData.chefs);
    const newRestaurants = await restaurantModel.create(mockData.restaurants);
    const newDishes = await dishModel.create(mockData.dishes);

    res.json({ newChefs, newRestaurants, newDishes });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
