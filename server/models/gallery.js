/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, maxLength: 64 },
    img: { type: String, required: [true, 'image link required'] },
    groupBy: {
      type: String,
      enum: { values: ['ambience', 'events', 'foods'], message: '{VALUE} is not supported' },
      required: [true, 'groupBy value required'],
    },
  },
  { timestamps: true },
);

gallerySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Gallery', gallerySchema);
