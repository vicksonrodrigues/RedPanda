/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const resEventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: [true, 'Name is required for this event'],
      immutable: true,
    },
    description: { type: String, required: [true, 'A short description is required'] },
    img: { type: String, required: [true, 'image link required'] },
    typicalAgeRange: {
      type: String,
      trim: true,
      required: [true, 'Age Range required'],
      enum: { values: ['below 18', 'above 18', 'all ages'], message: '{VALUE} is not supported' },
    },
    scheduleType: {
      type: String,
      required: [true, 'Schedule Type is required'],
      trim: true,
      enum: {
        values: ['single', 'recurring'],
        message: '{VALUE} is not supported',
      },
    },
    startDate: { type: Date, required: [true, 'start date is required'], immutable: true },
    endDate: { type: Date, required: [true, 'end date is required'] },
    scheduleDescription: { type: String, required: [true, 'event schedule is required'] },
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
