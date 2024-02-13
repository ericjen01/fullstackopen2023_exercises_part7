const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
    for (let user of helper.initialUsers) {
      let userObject = new User(user)
      await userObject.save()
    }
})

describe('-- initial blogs are saved and can be accessed via GET --', () => {
    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })
      
    test('all blogs are returned', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(helper.initialBlogs.length)
    })
        
    test('a partcular title exists in returned blogs', async () => {
        const res = await api.get('/api/blogs')
        const titles = res.body.map(r => r.title)
        expect(titles).toContain('React patterns')
    })
})

describe('-- blog addition --', () => {
  let headers
  beforeEach(async () => {
    const newUser = {
      username: 'unagisushi',
      name: 'Unagi Sushi',
      password: 'sashimi'
    }
    await api.post('/api/users').send(newUser)		
    const res = await api.post('/api/login').send(newUser)

    headers = {
      Authorization: `bearer ${res.body.token}`,
    }
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Supertest',
        author: 'Me',
        likes: 17,
        url: 'testdomain',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)  
    const finalBlogs = await helper.blogsInDb()
    expect(finalBlogs).toHaveLength(helper.initialBlogs.length + 1)
    const titles = finalBlogs.map(b => b.title)
    expect(titles).toContain('Supertest')
  })

  test('blog without title will yelid error', async () => {
    const newBlog = {
        author: 'Me',
        likes: 17,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(400)
      const finalBlogs = await helper.blogsInDb()
      expect(finalBlogs).toHaveLength(helper.initialBlogs.length)
  })

  test('testing blog update', async () => {
		const initialBlogs = await helper.blogsInDb()
		const blogToUpdate = initialBlogs[0]
		const testBlog = {
			likes: 32,
		}
		await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(testBlog)
      .expect(200)
		const finalBlogs = await helper.blogsInDb()
		expect(finalBlogs).toHaveLength(helper.initialBlogs.length)
		expect(finalBlogs[0].likes).toBe(testBlog.likes)
	})

  test('testing blog update w/ a full input', async () => {
    const initialBlogs = await helper.blogsInDb()
    const blogToUpdate = initialBlogs[0]
    const testBlog = {
        title: 'React patterns 2.0',
        author: 'Michael Chan 2.0',
        likes: 72,
        url:'testurl'
    }
    await api
        .get(`/api/blogs/${blogToUpdate.id}`)
        .send(testBlog)
        .expect(200)
    expect(blogToUpdate.title).toContain('React patterns')
    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(testBlog)
        .set(headers)
        .expect(200)
    const finalBlogs = await helper.blogsInDb()
    expect(finalBlogs[0].title).toEqual('React patterns 2.0')
})

  test ('likes property set to 0 if missing from request', async () =>{
    const newBlog = {
        author: 'Me',
        title: 'About Me',
    }
    const returnedBlog = await api
        .post("/api/blogs")
        .send(newBlog)
        .set(headers)
        .expect(201)
    expect(returnedBlog._body.likes).toEqual(0)
  })


  test('a blog can be removed', async () => {
    const initialBlogs = await helper.blogsInDb()
    const targetBlog = initialBlogs[0]
    await api
      .delete(`/api/blogs/${targetBlog.id}`)
      .set(headers)
      .expect(204)
    const finalBlogs = await helper.blogsInDb()
    expect(finalBlogs).toHaveLength(
      helper.initialBlogs.length - 1
    )
    const titles = finalBlogs.map(b => b.title)
    expect(titles).not.toContain(targetBlog.title)
  })    
})


describe('inintializing a sigle user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      const passwordHash = await bcrypt.hash('passCode', 10)
      const user = new User({ username: 'testUser', passwordHash })
      await user.save()
    })

    test('initial test user exists in db', async () => {
        const initialUsers = await helper.usersInDb()
        expect(initialUsers[0].username).toEqual('testUser')
    })
  
    test('new user can be added', async () => {
      const initialUsers = await helper.usersInDb()
      const newUser = {
        username: 'newUser01',
        name: 'New User',
        password: 'Nanaimo',
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const finalUsers = await helper.usersInDb()
      expect(finalUsers).toHaveLength(initialUsers.length + 1)
  
      const usernames = finalUsers.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('error code & message for dupo username', async () => {
        const initialUsers = await helper.usersInDb()
        const newUser = {
          username: 'testUser',
          name: 'Test User',
          password: 'Gateway',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(500)
          .expect('Content-Type', 'text/html; charset=utf-8')
        const finalUsers = await helper.usersInDb()
        expect(finalUsers).toEqual(initialUsers)
      })
  })
  
afterAll(async () => {
  await mongoose.connection.close()
})