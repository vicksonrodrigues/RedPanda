const galleryRouter = require('express').Router();
const Gallery = require('../models/gallery');

galleryRouter.get('/', async (request, response) => {
  const galleryItems = await Gallery.find({});

  response.json(galleryItems);
});
galleryRouter.get('/:groupBy', async (request, response) => {
  const galleryItems = await Gallery.find({ groupBy: request.params.groupBy });
  response.json(galleryItems);
});

galleryRouter.post('/', async (request, response) => {
  const { title, img, groupBy } = request.body;
  const gallery = new Gallery({
    title,
    img,
    groupBy,
  });

  const savedToGallery = await gallery.save();
  response.json(savedToGallery);
});

galleryRouter.put('/:id', async (request, response) => {
  const { body } = request;

  const gallery = {
    title: body.title,
    groupBy: body.groupBy,
  };

  const updatedGalleryItem = await Gallery.findByIdAndUpdate(request.params.id, gallery, {
    new: true,
    runValidators: true,
    context: 'query',
  });

  response.json(updatedGalleryItem);
});

galleryRouter.delete('/:id', async (request, response) => {
  await Gallery.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = galleryRouter;
