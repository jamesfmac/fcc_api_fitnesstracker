const Exercise = require('../models/exercise.js')
const User = require('../models/user.js')

exports.post = (req,res)=>{

  //create the eventual data for the new user
  const data = Object.assign({}, req.body) || {}
  
  //check for valid userID
  console.log(data.userId)
  User.findById(data.userId, (err,user)=>{
    
    console.log(user)
  
    if (!user){
     return res.status(404).send('userId not found')
    }
    
    Exercise.create(data)
        .then(exercise => {
        console.log(exercise)      
    
          res.json(exercise);
      })
    
        .catch(err => {
          console.error(err);
          res.status(500).send(err);
        });
  
  }) 
}