const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../index')
const Blog = require('../models/blog')
const testHelper = require('./test_helper')
const listHelper = require('../utils/list_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('When there is initially some blogs saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('root', 10)
    const user = new User({
      username: 'root',
      name: 'root',
      passwordHash
    })
    await user.save()

    const users = await testHelper.usersInDb()
    const root = users.find(user => user.username === 'root')
    
    await Blog.deleteMany({})
    
    for (let blog of testHelper.listBlogs){
      let blogObject = new Blog(blog)
      blogObject.user = root.id
      await blogObject.save()
    }
  })

  describe('Get a specific blog', () => {
    test('blogs are returned as json', async() => {
      await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    })
  
    test('blogs length of db is the same', async() => {
      const response = await api.get('/api/blogs')
  
      assert.strictEqual(response.body.length, testHelper.listBlogs.length)
    })
  
    test('unique identifier named id ', async() => {
      const response = await api.get('/api/blogs')
      const result = response.body[0]
      const keys = Object.keys(result) 
  
      assert(keys.includes('id'))
      assert.strictEqual(keys.includes('_id'), false)
    })
  })

  describe('Add a specific blog', () => {
    test('When add blog with incorrect login return 401', async() => {
      const newBlog = { 
        title: 'nwe blogs uperduper',
        author: 'ejemplo',
        url: 'https://homepages.cwi.nl/',
        likes: 2
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })

    test('Added a new blog', async () => {
      const loginResponse = await api
        .post('/api/login')
        .send({ username: 'root', password: 'root' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const token = loginResponse.body.token

      const newBlog = { 
        title: 'nwe blogs uperduper',
        author: loginResponse.body.name,
        url: 'https://homepages.cwi.nl/',
        likes: 2
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const responseGet = await api.get('/api/blogs')
      const titlesGet = responseGet.body.map(r => r.title)
      // Test for the length blogs
      assert.strictEqual(titlesGet.length, testHelper.listBlogs.length + 1)
      // Test for content 
      assert(titlesGet.includes(newBlog.title))
    })
  
    test('Missing likes property use default 0', async () => {
      const loginResponse = await api
        .post('/api/login')
        .send({ username: 'root', password: 'root' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const token = loginResponse.body.token

      const newBlogWithoutLikes = {
        title: 'ROS For all',
        author: 'Nicolas Norambuena',
        url: 'https://ros.cwi.nl/',
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogWithoutLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const response = await api.get('/api/blogs')
      const savedBlog = response.body.find(blog => blog.title === newBlogWithoutLikes.title)
  
      assert.strictEqual(savedBlog.likes, 0)
    })
  
    test('Missing title property return 400', async () => {
      const BlogWithoutTitle = {
        author: 'Nicolas Norambuena',
        url: 'https://ros.cwi.nl/',
      }
      await api
        .post('/api/blogs')
        .send(BlogWithoutTitle)
        .expect(400)
    })
  
    test("Missing url property return 400", async () => {
      const BlogWithoutTitle = {
        title: 'ROS For all',
        author: 'Nicolas Norambuena',
      }
      await api
        .post('/api/blogs')
        .send(BlogWithoutTitle)
        .expect(400)
    })
  })

  describe('delete a specific blog', () => {
    test('deleted a specific blog by id', async () => {
      const loginResponse = await api
        .post('/api/login')
        .send({ username: 'root', password: 'root' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const token = loginResponse.body.token

      const blogToDelete = 'React patterns'
      const blogsSaved = await api.get('/api/blogs')
      const idBlogToDelete = listHelper.searchIdByTitle(blogsSaved.body, blogToDelete)
      
      await api
        .delete(`/api/blogs/${idBlogToDelete}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

    })
  })

  describe('Modify a specific blog', () => {
    test('Modify a specific blog by id', async () => {
      const blogToModify = 'React patterns'
      const bodyModify =  {
        title: "React patterns",
        author: "Arturo chan",
        url: "https://reactpatterns.new.com/",
        likes: 10,
      }
      const blogsSaved = await api.get('/api/blogs')
      const blogId = listHelper.searchIdByTitle(blogsSaved.body, blogToModify)
      // Get token
      const loginResponse = await api
        .post('/api/login')
        .send({ username: 'root', password: 'root' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const token = loginResponse.body.token

      await api
        .put(`/api/blogs/${blogId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(bodyModify)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      // Verify if data is saved
      const blogsSavedUpdate = await api.get('/api/blogs')
      const blogUpdate = blogsSavedUpdate.body.find(blog => blog.id === blogId)
      delete blogUpdate.id
      delete blogUpdate.user
      assert.deepEqual(blogUpdate, bodyModify)
    })
  })

})

after(async () => {
  await mongoose.connection.close()
})