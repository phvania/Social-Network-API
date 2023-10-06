const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName, getRandomthoughts } = require('./data');

//connection.on('error', (err) => err);
//connection to mongodb
connection.once('open', async () => {
  console.log('connected');
    try {
      // Delete the collections if they exist
      let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }
    
    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }
    
    // Create empty array to hold the users and thought
    const users = [];
    const thought = [];
    // Add students to the collection and await the results
    await User.collection.insertMany(users);
    
    // Add thoughts to the collection and await the results
    await Thought.collection.insertMany(thought);

    
    console.info('Seeding ');
    console.table(users);
    console.table(thought);
    process.exit(0);
  } catch (err) {
    console.error(err)  
  }
  })
    
  

  // Loop 20 times -- add users to the users array
 // for (let i = 0; i < 20; i++) {
   // Get some random friends  using a helper function that we imported from ./data
   // const friends = getRandomFriends(20);

    //const fullName = getRandomName();
    //const first = fullName.split(' ')[0];
    //const last = fullName.split(' ')[1];
    //const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    //users.push({
    //  first,
     // last,
     // github,
      //friends
   // });
  //}

  // Add students to the collection and await the results
  //await User.collection.insertMany(users);

  // Add thoughts to the collection and await the results
  //await Thought.collection.insertMany(thought);
    

  // Log out the seed data to indicate what should appear in the database

  