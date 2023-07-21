const galleryRouter = require('express').Router();
const Gallery = require('../models/gallery');

galleryRouter.get('/', async (request, response) => {
  const galleryItems = await Gallery.find({});

  response.json(galleryItems);
});

galleryRouter.post('/', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
    const { title, img, groupBy, author } = request.body;
    const gallery = new Gallery({
      title,
      img,
      groupBy,
      author,
    });

    const savedToGallery = await gallery.save();
    return response.status(201).json(savedToGallery);
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to add a new gallery item` })
    .end();
});

galleryRouter.put('/:id', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
    const { title, featured } = request.body;

    const gallery = {
      title,
      featured,
    };

    const updatedGalleryItem = await Gallery.findByIdAndUpdate(request.params.id, gallery, {
      new: true,
      runValidators: true,
      context: 'query',
    });

    return response.json(updatedGalleryItem);
  }
  return response.status(403).json({ error: `Don't have permission to update gallery item` }).end();
});

galleryRouter.delete('/:id', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
    const deletedGalleryItem = await Gallery.findByIdAndRemove(request.params.id);
    if (!deletedGalleryItem) {
      return response.status(404).end();
    }
    return response.status(204).end();
  }
  return response.status(403).json({ error: `Don't have permission to delete gallery item` }).end();
});

module.exports = galleryRouter;
