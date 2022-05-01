scalar GraphQLDate

enum StatusType {
  New
  Assigned
  Fixed
  Closed
}

type Issue {
  _id: ID!
  id: Int!
  title: String!
  status: StatusType!
  owner: String
  effort: Int
  created: GraphQLDate!
  due: GraphQLDate
}

type Campsite {
  _id: ID!
  campId: String
  name: String
  image: String
  description: String
  category: String
  price: Int
  countAvailable: Int
  rating: Float
  numReview: Int
  tags:[String]
}

type Blog {
  _id: ID!
  id: Int
  title: String!
  author_id:String!
  author_name: String!
  author_img:String
  intro:String!
  content:String!
  cover_img:String
  tags:[String]
  posted: GraphQLDate!
}

type Order {
  email: String
  campId: String
  date: GraphQLDate
  name: String
  phoneNum: String
  numCamp: Int
}

type Activity {
  _id: ID!
  id: Int
  title:String
  host_email:String
  host_name:String
  host_img:String
  name:String
  phoneNum:String
  camp_address:String
  camp_num:Int
  date: GraphQLDate
}

type AOrder {
  _id: ID!
  id: Int
  Aid: Int
  my_email:String
  title:String
  name: String
  camp_address:String
  date: GraphQLDate
  host_email:String
  phoneNum: String
  myname:String
  myphoneNum:String
  peopleNum:Int
}

type Collection{
  _id:ID!
  id:Int
  user_email:String
  user_name:String
  user_img:String
  blogid:Int
}

type Query {
  about: String!
  issueList: [Issue!]!
  campsiteList: [Campsite!]!
  campsiteById(campId: String): [Campsite]
  blogList:[Blog]
  blogByTags(tags:[String]):[Blog]
  blogById(id:Int):[Blog]
  blogByIds(ids:[Int]):[Blog]
  blogByEmail(email:String):[Blog]
  orderByEmail(email:String):[Order]
  activityList:[Activity]
  activityById(id:Int):[Activity]
  AorderByEmail(email:String):[AOrder]
  collectionByEmail(email:String):[Collection]
}

type Mutation {
  orderAdd( email: String,campId: String,date: GraphQLDate,name: String,phoneNum: String,numCamp: Int):Order
  blogAdd(id:Int,title: String,author_id:String,author_name:String,author_img:String,intro: String,content: String,tags: [String],posted: GraphQLDate,cover_img:String): Blog
  activityAdd(id:Int,title:String,host_email:String,host_name:String,host_img:String,name:String,phoneNum:String,camp_address:String,camp_num:Int,date: GraphQLDate):Activity
  AorderAdd(id: Int,Aid: Int,my_email:String,title:String,name: String,camp_address:String,date: GraphQLDate,host_email:String,phoneNum: String,myname:String,myphoneNum:String,peopleNum:Int):AOrder
  collectionAdd(id:Int,user_email:String,user_name:String,user_img:String,blogid:Int):Collection
}
