const Review = require('../../models/review');

const sampleReviews = [
  {
    commenter: 'Rahul Sen',
    comment:
      'Excellent food. Menu is extensive and seasonal to a particularly high standard. Definitely fine dining. It can be expensive but worth it and they do different deals on different nights so it’s worth checking them out before you book. Highly recommended.',
    star: 4,
  },
  {
    commenter: 'Kenny Das',
    comment:
      'The menus options are an excellent value. The dining experience overall is very pleasant. I highly recommend this restaurant.',
    star: 5,
  },
  {
    commenter: 'Aniket Kambli',
    comment:
      'Excellent. Delicious food, appealing atmosphere, helpful staff, and brilliant service.',
    star: 4,
  },
];

const initialReviews = async (reviewList) => {
  await Promise.all(
    reviewList.map(async (review) => {
      const { commenter, comment, star } = review;
      const newReviewList = new Review({
        commenter,
        comment,
        star,
      });
      await newReviewList.save();
    }),
  );
};

const reviewInDb = async () => {
  const reviews = await Review.find({});
  return reviews.map((item) => item.toJSON());
};

const nonExistingId = async () => {
  const newReview = new Review({
    commenter: 'John Law',
    comment:
      'Good. A fine example of a specific kind of restaurant. It can be delicious food with excellent service. You may think about returning if you wish to have that particular cuisine.',
    star: 3,
  });
  await newReview.save();
  await newReview.remove();
  return newReview._id.toString();
};

module.exports = {
  sampleReviews,
  initialReviews,
  reviewInDb,
  nonExistingId,
};
