const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema(
  
  {
    userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
    
    description: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique:true
    },
    duration: {
        type: Number,  
        required:true 
    },
    date: {
      type: Date, 
      required: false,
      default: Date.now
  }
  
  }
)

module.exports = mongoose.model('Excercise', ExerciseSchema)