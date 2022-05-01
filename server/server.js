const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

// const url = 'mongodb://mongo:27017/camptracker';
//localhost
const url = 'mongodb://localhost/camptracker';
let db;

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList,
    blogList,
    blogById,
    blogByIds,
    blogByTags,
    campsiteList,
    campsiteById,
    orderByEmail,
    blogByEmail,
    activityList,
    activityById,
    AorderByEmail,
    collectionByEmail
  },
  Mutation: {
    blogAdd,
    orderAdd,
    activityAdd,
    AorderAdd,
    collectionAdd
  },
  GraphQLDate,
};

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

async function issueList() {
  const issues = await db.collection('traveler').find({}).toArray();
  return issues;
}

async function activityList() {
  const activitys = await db.collection('activity').find({}).toArray();
  return activitys;
}

async function activityById(_,{id}){
  const activity = await db.collection('activity').find({id:id}).toArray();
  return activity;
}

async function campsiteList() {
  const campsites = await db.collection('campsites').find({}).toArray();
  return campsites;
}

async function campsiteById(_,{campId}){
  const campsite = await db.collection('campsites').find({campId:campId}).toArray();
  return campsite;
}

async function blogList() {
  const blogs = await db.collection('blogs').find({}).toArray();
  return blogs;
}

async function blogById(_,{id}){
  const blog = await db.collection('blogs').find({id:id}).toArray();
  return blog;
}

async function blogByIds(_,{ids}){
  const blogs = await db.collection('blogs').find({id:{$in:ids}}).toArray();
  return blogs;
}

async function blogByEmail(_,{email}){
  const blog = await db.collection('blogs').find({author_id:email}).toArray();
  return blog;
}

async function blogByTags(_,{tags}) {
  const blogs = await db.collection('blogs').find({tags:{$in:tags}}).toArray();
  return blogs;
}

async function orderByEmail(_,{email}) {
  const orders = await db.collection('orders').find({email:email}).toArray();
  return orders;
}

async function AorderByEmail(_,{email}) {
  const Aorders = await db.collection('Aorders').find({my_email:email}).toArray();
  return Aorders;
}

async function collectionByEmail(_,{email}) {
  const collections = await db.collection('collections').find({user_email:email}).toArray();
  return collections;
}

async function getNextSequence(name) {
  const result = await db.collection('traveler').findOneAndUpdate(
    { _id: name },
    { $inc: { "current": 1 } },
    { returnOriginal: false },
  );
  console.log(result)
  return result.value.current;
}


async function issueAdd( _,issue) {
  const traveler = { name: issue.name, number:issue.number, timestamp:issue.timestamp };
  const result = await db.collection('traveler').insertOne(traveler);
  const savedIssue = await db.collection('traveler')
    .findOne({ _id: result.insertedId });
  return savedIssue;
}

async function orderAdd( _,order) {
  const orderissue = { email: order.email, campId:order.campId, date:order.date,name:order.name,
  	phoneNum:order.phoneNum, numCamp:order.numCamp
   };
  const result = await db.collection('orders').insertOne(orderissue);
  const savedIssue = await db.collection('orders')
    .findOne({ _id: result.insertedId });
  return savedIssue;
}

async function blogAdd( _,blog) {
	const count = await db.collection('blogs').find().count();

  const blogissue = { id:count+1, title: blog.title, author_id:blog.author_id, author_name:blog.author_name,author_img:blog.author_img,intro:blog.intro,
  	content:blog.content, tags:blog.tags, posted:blog.posted, cover_img:blog.cover_img
   };
  const result = await db.collection('blogs').insertOne(blogissue);
  const savedIssue = await db.collection('blogs')
    .findOne({ _id: result.insertedId });
  return savedIssue;
}

async function activityAdd( _,activity) {
	const count = await db.collection('activity').find().count();

  const activityissue = { id:count+1,title:activity.title,host_email:activity.host_email,host_name:activity.host_name,host_img:activity.host_img,
  	name:activity.name,phoneNum:activity.phoneNum,camp_address:activity.camp_address,camp_num:activity.camp_num,date: activity.date
   };
  const result = await db.collection('activity').insertOne(activityissue);
  const savedIssue = await db.collection('activity')
    .findOne({ _id: result.insertedId });
  return savedIssue;
}

async function AorderAdd( _,Aorder) {
	const count = await db.collection('Aorders').find().count();

  const Aorderissue = { id:count+1,Aid:Aorder.Aid,my_email:Aorder.my_email,title:Aorder.title,
  	name: Aorder.name,camp_address:Aorder.camp_address,
  	date: Aorder.date,host_email:Aorder.host_email,phoneNum: Aorder.phoneNum,myname:Aorder.myname,
  	myphoneNum:Aorder.myphoneNum,peopleNum:Aorder.peopleNum
   };
  const result = await db.collection('Aorders').insertOne(Aorderissue);
  const savedIssue = await db.collection('Aorders')
    .findOne({ _id: result.insertedId });
  return savedIssue;
}


async function collectionAdd( _,collection) {
	const count = await db.collection('collections').find().count();

  const collectionissue = { id:count+1,user_email:collection.user_email,
  	user_name:collection.user_name,user_img:collection.user_img,
  	blogid: collection.blogid
   };
  const result = await db.collection('collections').insertOne(collectionissue);
  const savedIssue = await db.collection('collections')
    .findOne({ _id: result.insertedId });
  return savedIssue;
}

// async function issueDel(_,issue) {
//   const delid = {name:issue.name};

//   var delres = await db.collection('traveler').deleteOne(delid);

//   const savedIssue = await db.collection('traveler')
//     .findOne({ name: '222'});
//   return savedIssue;
// }

// async function blackuserAdd( _,issue) {

//   const blackuser = { name: issue.name };

//   const result = await db.collection('blacklist').insertOne(blackuser);
//   const savedIssue = await db.collection('blacklist')
//     .findOne({ _id: result.insertedId });
//   return savedIssue;
// }

async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true});
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.js', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});

const app = express();
// app.use(express.static('views'));

server.applyMiddleware({ app, path: '/graphql' });

(async function () {
  try {
    await connectToDb();
    app.listen(8000, function () {
      console.log('App started on port 8000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();