const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

commentsRouter.get('/', async(req, res) => {
  const comments = await Comment.find({})
  res.json(comments)
})

commentsRouter.post('/', async(req,res) => {
  let token 
  const body = req.body
  const {content, user} = req.body

  req.user
    ?(token = req.headers.authorization.split(' ')[1])
    :res.status(401).json({ error: 'token missing or invalid' });

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const decodedUser = await User.findById(decodedToken.id) 
  if(!(decodedUser)){
      return res.status(400).json({error: 'token required'})
  }

  /*
const commentSchema = new mongoose.Schema({
  content: {
    type:String,
    minlength: 1,
    required: true,
  },
  id: String,
  date: String,
  user:{
    userId: String, 
    username: String
  }
})
*/
  const commentToPost = new Comment({
    content: body.content,
    date: new Date().toISOString().slice(0,10),
    commentId: body.commentId,
    blogId: body.blogId,
    user:{
        userId: decodedUser._id,
        username: decodedUser.username
    }
  })

  const savedComment = await commentToPost.save()
  decodedUser.comments = decodedUser.comments.concat(savedComment)
  await decodedUser.save()
  res.status(201).json(savedComment)

})

module.exports = commentsRouter