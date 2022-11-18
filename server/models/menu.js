/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const customizationItemSchema = new mongoose.Schema(
  {
    itemName: { type: String },
    prices: [Number],
    isSinglePriceActive: { type: Boolean, default: true },
  },
  { _id: false },
);

const customizationSchema = new mongoose.Schema(
  {
    cName: { type: String },
    cItem: [customizationItemSchema],
  },
  { _id: false },
);

const menuSchema = new mongoose.Schema(
  {
    dishName: { type: String, required: true },
    subMenu: { type: String, enum: ['burger', 'pizza', 'pasta', 'beverage'], required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
    newLaunch: { type: Boolean },
    chefRecommended: { type: Boolean },
    available: { type: Boolean, default: true },
    customization: [customizationSchema],
  },
  { timestamps: true },
);

menuSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Menu', menuSchema);
