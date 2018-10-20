const User = require('../models/user.js')
const Exercise = require('../models/exercise.js')

exports.post = (req,res)=>{

  //create the eventual data for the new user
  const data = Object.assign({}, req.body) || {}
  
  User.findOne(data)
  
      .then( user => {
      console.log(user)
        if (user){
         return res.status(422).send('username already taken') 
        }
    
        User.create(data)
      
    
        .catch(err => {
          console.error(err);
          res.status(500).send(err);
        });
      })
}


exports.get = (req, res) =>{

  User.findById(req.params.userId)
      .then (user => {
      if (!user){
        return  res.status(404).send('user not found') 
      }
      res.json(user)
    
      })
    .catch(err => {
     res.status(500).send(err)
    })
  
  }


exports.list = (req, res)=>{
  
   User.find({}, (err, users) =>{
     
     if (!users){
      return res.send('No users found')
       
     }
     
    res.send(users);  
     
  });
    
}


exports.listExercises = (req, res )=> {
  
  //get user object
  
  
  User.findById({_id:req.params.userId})
      .lean() //needed to change the return mongoose doc to a regular js object so that we can later append to it
      .then(user => {
        let searchDetails = Object.assign({},req.params)
        const searchOptions = {sort: '-date'} //sort by most recent first
     
         if(req.query.from && req.query.to){
           searchDetails.date = {
             "$gte": req.query.from, "$lt": req.query.to 
           }
         }
      
            Exercise.find(searchDetails,null,searchOptions)
                    .then( (exercises) =>{    
              
                      const queryLimit = req.query.limit ||exercises.length
              
                          user.count= exercises.length
                          user.log = exercises.slice(0,queryLimit)
                          res.json(user)
                  
                     })  
                  
          
          
      })
      .catch(err => {
          console.error(err);
          res.status(500).send(err);
      })
}
  
  
//   //create an object to search from based on query and params. Won't currently filter out uknown params
//   let query = Object.assign({},req.params)
  
//   let options = {}
  
  
//   if (req.query) 
//   {
//     if(req.query.from && req.query.to){
   
//       query.date = {
//         "$gte": req.query.from, "$lt": req.query.to 
//       }
    
//     }

//     if (req.query.limit){
//       options.limit = parseInt(req.query.limit) 
//     }
//   }
//   console.log({data:query, options: options})
  
  
  
//  Exercise.find(query, null, options, (err, exercises) =>{
 
//    return res.json(exercises)
 
//  })
// }
