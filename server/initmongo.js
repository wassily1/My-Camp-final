/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/travellertracker scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/travellertracker scripts/init.mongo.js
 */

const campsitesDB = [
  {
      campId: '1',
      name: 'All Stars Camping',
      image: '/images/campsite1.jpeg',
      description: 'This is the description of campsite 1. This is the description of campsite 1. This is the description of campsite 1. This is the description of campsite 1.',
      category: 'Forest',
      price: 1200,
      countAvailable: 3,
      rating: 5,
      numReview: 3,
      tags: ["forest","woods","good air"]
  },
  {
      campId: '2',
      name: 'Peace Mountain',
      image: '/images/campsite2.jpeg',
      description: 'This is the description of campsite 2. This is the description of campsite 2. This is the description of campsite 2. This is the description of campsite 2.',
      category: 'Grass',
      price: 800,
      countAvailable: 9,
      rating: 4.5,
      numReview: 2,
      tags: ["mountain","hiking","quiet"]
  },
  {
      campId: '3',
      name: 'Cloud Up Camping',
      image: '/images/campsite3.jpeg',
      description: 'This is the description of campsite 3. This is the description of campsite 3. This is the description of campsite 3. This is the description of campsite 3.',
      category: 'Cloud Sea',
      price: 1000,
      countAvailable: 0,
      rating: 5,
      numReview: 6,
      tags: ["climbing","mountain"]
  },
  {
      campId: '4',
      name: 'Lakeside Camping',
      image: '/images/campsite4.jpeg',
      description: 'This is the description of campsite 4. This is the description of campsite 4. This is the description of campsite 4. This is the description of campsite 4.',
      category: 'Lake',
      price: 800,
      countAvailable: 8,
      rating: 4,
      numReview: 2,
      tags: ["lake","good air"]
  },
]
const tempOrder1 = {
  campId: "1",
  date: "2022-05-04",
  name: "Ben",
  phoneNum: "123456",
  email: "abc@gmail.com",
  numCamp: 1
}
const tempOrder2 = {
  campId: "2",
  date: "2022-05-04",
  name: "Ben",
  phoneNum: "123456",
  email: "abc@gmail.com",
  numCamp: 1
}

const blogsDB = [
  {
    id: 1, title: 'Experience of All Stars Camping', author_id: 'Huiyi@.com', author_name: 'huiyi',
    intro:'Unforgettable night view of the mountain.',content:'Omitted',cover_img:'/images/campsite1.jpeg',
    tags:['woods','quiet'],posted:new Date('2022-01-15')
  },
  {
    id: 2, title: 'Happy Lakeside walking', author_id: 'Liam@.com', author_name: 'Liam',
    intro:'The quiet walking with friends on April morning',content:'Omitted',cover_img:'/images/campsite3.jpeg',
    tags:['lake','good air'],posted:new Date('2022-04-15')
  },
];

const activityDB = [
  {
    id: 1, title: 'Here we go!', host_email: 'Huiyi@.com', host_name: 'huiyi',host_img:'',
    name:'huiyi',phoneNum:'48878955',camp_address:'Peace Mountain',camp_num:20,date:new Date('2022-05-15')
  },
  {
    id: 2, title: 'Let camp!', host_email: 'Huiyi@.com', host_name: 'huiyi2',host_img:'',
    name:'huiyi',phoneNum:'48878955',camp_address:'The Lake',camp_num:30,date:new Date('2022-06-15')
  },
];



db = db.getSiblingDB('camptracker');
db.campsites.remove({});
db.orders.remove({});
db.blogs.remove({});
db.activity.remove({});
db.Aorders.remove({});

db.blogs.insertMany(blogsDB);
db.orders.insert(tempOrder1);
db.orders.insert(tempOrder2);
db.campsites.insertMany(campsitesDB);
db.activity.insertMany(activityDB)

const count = db.campsites.count();
const count2 = db.activity.count();
print('Inserted', count, 'campsites');
print('Inserted', count2, 'activity');

db.campsites.createIndex({ campId: 1 }, { unique: true });
// db.campsites.createIndex({ _id: 1 }, { unique: true });