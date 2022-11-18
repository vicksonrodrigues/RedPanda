const menuData = [
  {
    Name: 'Bacon Blue Cheese Burger with Caramelized Onions',
    Price: '13',
    Image:
      'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80',
    Discription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqu',

    AddOns: [
      {
        name: 'Extra patty',
        price: [10],
      },
      {
        name: 'Extra cheese',
        price: [1],
      },
      {
        name: 'Wheat bun',
        price: [5],
      },
    ],
    Sauces: [
      {
        name: 'Tom Mayo',
        price1: 0,
        price2: null,
      },
      {
        name: 'Veg Sauce',
        price1: 2,
        price2: null,
      },
    ],

    Veggies: [
      {
        name: 'Onion',
        price1: 1,
        price2: 2,
      },
      {
        name: 'Jalapeno',
        price1: 2,
        price2: 4,
      },
      {
        name: 'Lettuce',
        price1: 1,
        price2: null,
      },
    ],
  },
];

export default menuData;
