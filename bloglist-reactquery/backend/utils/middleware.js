const jwt = require('jsonwebtoken')
const User = require('../models/user')
const morgan = require('morgan')
const logger = require('./logger')

const reqLogger = morgan.token("body", (req) => {
    return JSON.stringify(req.body);
  });
  
const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)
  
    if (err.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message })
    } else if (err.name ===  'JsonWebTokenError') {
      return res.status(401).json({ error: err.message })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
          error: 'token expired'
        })
      }
    
    next(err)
  }

const userExtractor = async (req, res, next) => {
	const authorization = req.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		const token = authorization.substring(7)
		const decodedToken = jwt.verify(token, process.env.SECRET)
		const user = await User.findById(decodedToken.id)
		req.user = user
	}
	next()
	return null
}

module.exports = {
	reqLogger,
	unknownEndpoint,
	errorHandler,
	userExtractor,
}