const reviewRouter = require('express').Router();
const Review = require('../models/review');

reviewRouter.get('/', async (request, response) => {
  const reviews = await Review.find({});
  response.json(reviews);
});

reviewRouter.post('/', async (request, response) => {
  const { commenter, comment, star } = request.body;
  const review = new Review({
    commenter,
    comment,
    star,
  });

  const savedReview = await review.save();
  response.json(savedReview);
});

reviewRouter.put('/:id', async (request, response) => {
  const { body } = request;
  const review = {
    comment: body.comment,
    star: body.star,
  };

  const updatedReview = await Review.findByIdAndUpdate(request.params.id, review, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  response.json(updatedReview);
});

reviewRouter.delete('/:id', async (request, response) => {
  await Review.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = reviewRouter;
