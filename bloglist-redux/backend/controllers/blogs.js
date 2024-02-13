const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { restart } = require('nodemon')
const User = require('../models/user')
const Blog = require('../models/blog')
 

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})  
       res.json(blogs)
})

blogsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id
    const blog = await Blog.findById(id)
    blog
    ? res.json(blog)
    : res.status(404).end()
})

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('bearer ')) {
      return authorization.replace('bearer ', '')
    }
    return null
}

blogsRouter.post('/', async (req, res, next) => {

    let token
    const body = req.body
    const { title, url, likes, author } = req.body;

    (req.user)
        ? (token = req.headers.authorization.split(' ')[1])
        : res.status(401).json({ error: 'token missing or invalid' });

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    const decodedUser = await User.findById(decodedToken.id)    
    if(!(decodedUser && title && url)){
        return res.status(400).json({error: 'title, token and url required'})
    }
    console.log("....blog: ", decodedUser.username)
    console.log("....blog: ", decodedUser._id)

    likes: body.likes
        ? body.likes 
        : body.likes = 0

const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        date: new Date().toISOString().slice(0,10),
        user:{
            userId: decodedUser._id,
            username: decodedUser.username
        }
    })
    
    const savedBlog = await blog.save()
    decodedUser.blogs = decodedUser.blogs.concat(savedBlog._id)
    await decodedUser.save()
    res.status(201).json(savedBlog)
})

blogsRouter.put("/:id", async (req, res, next) => {
    console.log("backend updating")
    const { author, title, url, likes } = req.body;
    const id = req.params.id;
    const blog = new Blog({id, author, title, url, likes})
    const savedBlog = await Blog.findByIdAndUpdate(id, blog, {new: true,})
    res.status(200).json(savedBlog)
  });

blogsRouter.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    const user = req.user
    const blog = await Blog.findByIdAndRemove(id)
    res.status(204).json(blog)
})

module.exports = blogsRouter 