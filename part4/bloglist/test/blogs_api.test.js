const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../index')
const Blog = require('../models/blog')
const testHelper = require('./test_helper')

const api = supertest(app)

describe.only('When there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    
    for (let blog of testHelper.listBlogs){
      let blogObject = new Blog(blog)
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

  describe.only('Add a specific blog', () => {
    test('Added a new blog', async () => {
      const newBlog = { 
        title: 'nwe blogs uperduper',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/',
        likes: 2
      }
      await api
        .post('/api/blogs')
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
      const newBlogWithoutLikes = {
        title: 'ROS For all',
        author: 'Nicolas Norambuena',
        url: 'https://ros.cwi.nl/',
      }
      await api
        .post('/api/blogs')
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


})

after(async () => {
  await mongoose.connection.close()
})