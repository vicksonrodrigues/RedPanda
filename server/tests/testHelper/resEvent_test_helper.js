const ResEvent = require('../../models/restaurantEvent');

const sampleEvents = [
  {
    eventName: 'Basic cooking bootcamp',
    description:
      'Get ready to learn to learn cooking from our very own head chef! Beginner friendly. Learn quick and basic meal prepartion with some secret insider tricks and technique .',
    img: 'http://d3j0x1xdvdvm.cloudfront.net/Gallery/Ambience/NatureVibe.jpg',
    typicalAgeRange: 'above 18',
    scheduleType: 'recurring',
    startDate: '2022-11-10',
    endDate: '2022-11-14',
    scheduleDescription: `Date: 23rd,26th,27th January
     Time: 10 AM - 12 PM `,
  },
  {
    eventName: 'Art Exhibition by Van de Guess',
    description:
      'Get lost into the wonderful painting and art created by world renowned artist Van de Guess while we serve you the best food the town',
    img: 'http://d3j0x1xdvdvm.cloudfront.net/Gallery/Ambience/NatureVibe.jpg',
    typicalAgeRange: 'all ages',
    scheduleType: 'recurring',
    startDate: '2022-11-27',
    endDate: '2022-11-30',
    scheduleDescription: `Date: 4th January to 7th January
     Time: 10 AM - 9 PM`,
  },
  {
    eventName: 'Pokemon Go Meet-up',
    description:
      'Get ready to meet all the fellow Pokemon trainer in your area . Trade , Battle or discuss anything and everything you love about pokemon at this event',
    img: 'http://d3j0xdvdfvm.tygont.net/Gallery/Ambience/Pikachu.jpg',
    typicalAgeRange: 'all ages',
    scheduleType: 'single',
    startDate: '2022-12-4',
    endDate: '2022-12-4',
    scheduleDescription: `Date: 14th January
     Time:10 AM - 2 PM`,
  },
];

const initialEvents = async (itemList) => {
  await Promise.all(
    itemList.map(async (item) => {
      const {
        eventName,
        typicalAgeRange,
        scheduleType,
        startDate,
        endDate,
        scheduleDescription,
        description,
        img,
      } = item;
      const newGalleryItem = new ResEvent({
        eventName,
        description,
        img,
        typicalAgeRange,
        scheduleType,
        startDate,
        endDate,
        scheduleDescription,
      });
      await newGalleryItem.save();
    }),
  );
};

const nonExistingId = async () => {
  const newGalleryItem = new ResEvent({
    eventName: 'DigiMon Go Meet-up',
    description:
      'Get ready to meet all the fellow DigiMon fans in your area . Trade , Battle or discuss anything and everything you love about DigiMon at this event',
    img: 'http://d3j0xdvdfvm.tygont.net/Gallery/Ambience/Pikachu.jpg',
    typicalAgeRange: 'all ages',
    scheduleType: 'single',
    startDate: '2022-12-14',
    endDate: '2022-12-14',
    scheduleDescription: `Date: 14th January
     Time:10 AM - 2 PM`,
  });
  await newGalleryItem.save();
  await newGalleryItem.remove();
  return newGalleryItem._id.toString();
};

const eventsInDb = async () => {
  const galleryItems = await ResEvent.find({});
  return galleryItems.map((item) => item.toJSON()); // (.toJSON) used for removing _id,__v,passwordHash
};
module.exports = {
  eventsInDb,
  initialEvents,
  nonExistingId,
  sampleEvents,
};
