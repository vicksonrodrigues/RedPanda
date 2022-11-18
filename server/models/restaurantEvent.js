/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const resEventSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true, immutable: true },
    startDate: { type: Date, required: true },
    endDate: {
      type: Date,
    },
    description: { type: String, required: true },
    img: { type: String, required: true, immutable: true },
  },
  { timestamps: true },
);

resEventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('ResEvent', resEventSchema, 'events');
