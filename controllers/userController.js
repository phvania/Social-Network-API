const {User, Thought} = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
      try {
        const users = await User.find()
         
        res.json(users);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Get a single user
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .select('-__v');
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' })
        }
  
        res.json({
          user,
          //grade: await grade(req.params.userId),
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // create a new user
    async createUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    //update a user
    async updateUser(req, res) {
      try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body,{new: true, runValidators: true});
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Delete a user 
    async deleteUser(req, res) {
   
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        res.status(200).json({message:"success"})
       
    
        //const course = await Course.findOneAndUpdate(
         // { students: req.params.studentId },
         // { $pull: { students: req.params.studentId } },
         // { new: true }
        //);
  
        //if (!course) {
         // return res.status(404).json({
           // message: 'Student deleted, but no courses found',
          
    },
  
    // Add a friend
    async addFriend(req, res) {
      console.log('You are adding a friend');
      console.log(req.body);
    
      try {
        const user= await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        );
      
        if (!user) {
          return res
            .status(404)
            .json({ message: 'No user found with that ID' });
        }
      
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Remove friend
    async removeFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends:  req.params.friendId } }, 
          { runValidators: true, new: true }
        );
      
        
        if (!user) {
          return res
            .status(404)
            .json({ message: 'No user found with that ID :(' });
        }
      
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
      }
}

//module.exports = userController;