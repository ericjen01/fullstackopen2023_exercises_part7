require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const commentsRouter = require('./controllers/comments')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(middleware.userExtractor)
app.use(cors())
/*
app.use(cors({
  origin:'http://localhost:5173', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
))
*/
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs/:id/comments', commentsRouter)
if (process.env.NODE_ENV === 'test') {
  console.log("connecting to testing data")
  const testingRouter = require('./controllers/cypresstesting')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.reqLogger(
    "method-:method, status-:status, url-:url, body-:body"
  )
);
//app.use(middleware.errorHandler)
//app.use(middleware.unknownEndpoint)

module.exports = app