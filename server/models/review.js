/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    commenter: { type: String, required: [true, 'one of the field is missing'], immutable: true },
    comment: { type: String, required: [true, 'one of the field is missing'] },
    star: { type: Number, min: 1, max: 5, required: [true, 'one of the field is missing'] },
  },
  { timestamps: true },
);

reviewSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Review', reviewSchema);
