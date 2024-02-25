const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  name: String, 
  passwordHash: String,

  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog' //'Blog' as the export of models > user > module.exports
    }
  ],

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
        delete returnedObj.passwordHash
    }
})
const User = mongoose.model('User', userSchema,)

module.exports = User