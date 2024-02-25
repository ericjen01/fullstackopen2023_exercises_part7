const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		likes: 7,
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		likes: 5,
	}
]

const initialUsers = [
	{
		username: 'natoumaki',
		name: 'Natou Maki',
		password: 'sashimi',
	},
	{
		username: 'tamagomaki',
		name: 'Tamago Maki',
		password: 'sashimi',
	},
]

const nonExistingId = async () => {
    const blog = new Blog({ 
      title: 'willremovethissoon' 
    })
    await blog.save()
    await blog.deleteOne()
    return blog._id.toString()
  }
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  
module.exports = {
    initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
  }
