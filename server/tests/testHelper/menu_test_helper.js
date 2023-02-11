const Menu = require('../../models/menu');

const sampleMenuItems = [
  {
    dishName: 'Bacon Blue Cheese Burger with Caramelized Onions',
    subMenu: 'burger',
    price: 21,
    img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    newLaunch: true,
    customization: [
      {
        cTypeName: 'Add-ons',
        cItems: [
          {
            itemName: 'Patty',
            price: [0, 8],
            isSinglePriceActive: true,
          },
          {
            itemName: 'Wheat-Bun',
            price: [3],
            isSinglePriceActive: false,
          },
          {
            itemName: 'Cheese',
            price: [2, 8],
            isSinglePriceActive: false,
          },
        ],
      },
      {
        cTypeName: 'Sauces',
        cItems: [
          {
            itemName: 'Southwest Chipotle',
            price: [0, 2],
            isSinglePriceActive: true,
          },
        ],
      },
    ],
  },
  {
    dishName: 'Margherita Pizza',
    subMenu: 'pizza',
    price: 23,
    img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763458?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    newLaunch: true,
    customization: [
      {
        cTypeName: 'Add-ons',
        cItems: [
          {
            itemName: 'Sausage',
            price: [3, 5],
            isSinglePriceActive: false,
          },
          {
            itemName: 'Salami',
            price: [2, 4],
            isSinglePriceActive: false,
          },
          {
            itemName: 'Extra Cheese',
            price: [0, 8],
            isSinglePriceActive: false,
          },
        ],
      },
      {
        cTypeName: 'Crust',
        cItems: [
          {
            itemName: 'Hand Tossed',
            price: [2],
            isSinglePriceActive: false,
          },
          {
            itemName: 'Thin Crust',
            price: [2],
            isSinglePriceActive: false,
          },
        ],
      },
      {
        cTypeName: 'Size',
        cItems: [
          {
            itemName: 'Medium',
            price: [10],
            isSinglePriceActive: false,
          },
          {
            itemName: 'Large',
            price: [15],
            isSinglePriceActive: false,
          },
        ],
      },
    ],
  },
  {
    dishName: 'Pasta alla Norma',
    subMenu: 'pasta',
    price: 19,
    img: 'https://images.unsplash.com/photo-1565299507177-b0adsc66763458?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    newLaunch: true,
    chefRecommended: true,
    customization: [
      {
        cTypeName: 'Veggies',
        cItems: [
          {
            itemName: 'Mushroom',
            price: [0, 3],
            isSinglePriceActive: true,
          },
          {
            itemName: 'Olives',
            price: [2, 4],
            isSinglePriceActive: false,
          },
          {
            itemName: 'Sweet Corn',
            price: [2, 3],
            isSinglePriceActive: false,
          },
        ],
      },
      {
        cTypeName: 'Add-Ons',
        cItems: [
          {
            itemName: 'Chicken',
            price: [2],
            isSinglePriceActive: false,
          },
          {
            itemName: 'Chicken Sausage',
            price: [2],
            isSinglePriceActive: false,
          },
          {
            itemName: 'Paneer',
            price: [2],
            isSinglePriceActive: false,
          },
        ],
      },
    ],
  },
  {
    dishName: 'Soft Drinks',
    subMenu: 'beverage',
    price: 6,
    img: 'https://images.unsplash.com/photo-1565299507177-b0ad5266763458?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    newLaunch: true,
    customization: [
      {
        cTypeName: 'Size',
        cItems: [
          {
            itemName: 'Medium',
            price: [4],
            isSinglePriceActive: false,
          },
          {
            itemName: 'Large',
            price: [8],
            isSinglePriceActive: false,
          },
        ],
      },
      {
        cTypeName: 'Choose your Drink',
        cItems: [
          {
            itemName: 'Coke',
            price: [0],
            isSinglePriceActive: false,
          },
          {
            itemName: 'Fanta',
            price: [0],
            isSinglePriceActive: false,
          },
          {
            itemName: 'Sprite',
            price: [0],
            isSinglePriceActive: false,
          },
        ],
      },
    ],
  },
];

const menuInDb = async () => {
  const menuItems = await Menu.find({});
  return menuItems.map((item) => item.toJSON());
};

const initialMenuItems = async (itemList) => {
  await Promise.all(
    itemList.map(async (item) => {
      const newMenuItem = new Menu(item);
      await newMenuItem.save();
    }),
  );
};

const nonExistingId = async () => {
  const newMenuItem = new Menu({
    dishName: 'Ultimate Veggie Burgers',
    subMenu: 'burger',
    price: 20,
    img: 'https://images.unsplash.com/photo-15652995072g7-b0ac66763828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    newLaunch: true,
    customization: [
      {
        cTypeName: 'Add-ons',
        cItems: [
          {
            itemName: 'Patty',
            price: [0, 8],
            isSinglePriceActive: true,
          },
          {
            itemName: 'Wheat-Bun',
            price: [3],
            isSinglePriceActive: false,
          },
          {
            itemName: 'Cheese',
            price: [2, 8],
            isSinglePriceActive: false,
          },
        ],
      },
      {
        cTypeName: 'Sauces',
        cItems: [
          {
            itemName: 'Habanero',
            price: [1, 2],
            isSinglePriceActive: false,
          },
          {
            itemName: 'Veg Sauce',
            price: [2, 4],
            isSinglePriceActive: false,
          },
        ],
      },
    ],
  });
  await newMenuItem.save();
  await newMenuItem.remove();
  return newMenuItem._id.toString();
};

module.exports = {
  sampleMenuItems,
  menuInDb,
  initialMenuItems,
  nonExistingId,
};
