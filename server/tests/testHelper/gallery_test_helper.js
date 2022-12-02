const Gallery = require('../../models/gallery');

const sampleGalleryItems = [
  {
    title: 'Nature vibe with plant and wood furniture',
    img: 'http://d3j0x1xj96q3am.cloudfront.net/Gallery/Ambience/NatureVibe.jpg',
    groupBy: 'ambience',
  },
  {
    title: 'Community meet up',
    img: 'http://d3j0ftrdf.cloud.net/Gallery/Events/dfdfdffffvd.jpg',
    groupBy: 'events',
  },
  {
    title: 'Tex Mex Burger by Pikapooh',
    img: 'http://d3j0fsdsddf.cloud.net/Gallery/Foods/dkeihdjys.jpg',
    groupBy: 'foods',
  },
];

const initialGalleryItems = async (itemList) => {
  await Promise.all(
    itemList.map(async (item) => {
      const { title, img, groupBy } = item;
      const newGalleryItem = new Gallery({
        title,
        img,
        groupBy,
      });
      await newGalleryItem.save();
    }),
  );
};

const nonExistingId = async () => {
  const newGalleryItem = new Gallery({
    title: 'Farm fresh Pizza by CharPiz',
    img: 'http://d3j0dhrjonaam.dlofdfovt.net/Gallery/Foods/hfdjemks.jpg',
    groupBy: 'foods',
  });
  await newGalleryItem.save();
  await newGalleryItem.remove();
  return newGalleryItem._id.toString();
};

const galleryInDb = async () => {
  const galleryItems = await Gallery.find({});
  return galleryItems.map((item) => item.toJSON()); // (.toJSON) used for removing _id,__v,passwordHash
};
module.exports = {
  galleryInDb,
  sampleGalleryItems,
  initialGalleryItems,
  nonExistingId,
};
