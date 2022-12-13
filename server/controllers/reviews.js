const reviewRouter = require('express').Router();
const Review = require('../models/review');

reviewRouter.get('/', async (request, response) => {
  const reviews = await Review.find({});
  response.json(reviews);
});

reviewRouter.post('/', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
    const { commenter, comment, star } = request.body;
    const review = new Review({
      commenter,
      comment,
      star,
    });

    const savedReview = await review.save();
    return response.status(201).json(savedReview);
  }
  return response.status(403).json({ error: `Don't have permission to add a new review` }).end();
});

reviewRouter.put('/:id', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
    const { comment, star } = request.body;
    const review = {
      comment,
      star,
    };

    const updatedReview = await Review.findByIdAndUpdate(request.params.id, review, {
      new: true,
      runValidators: true,
      context: 'query',
    });
    return response.json(updatedReview);
  }
  return response.status(403).json({ error: `Don't have permission to update review` }).end();
});

reviewRouter.delete('/:id', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
    const deletedReview = await Review.findByIdAndRemove(request.params.id);
    if (!deletedReview) {
      return response.status(404).end();
    }
    response.status(204).end();
  }
  return response.status(403).json({ error: `Don't have permission to delete reviews` }).end();
});

module.exports = reviewRouter;
