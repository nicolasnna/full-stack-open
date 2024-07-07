const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../index')
const User = require('../models/user')
const helper = require('./test_helper')

const bcrypt = require('bcrypt')
const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({
      username: 'root',
      name: 'root',
      passwordHash
    })

    await user.save()
  })

  describe('Add a new users', () => {
    test('Creation succedes with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
      
      const newUser = {
        name: 'nicolas norambuena',
        username: 'nicolas',
        password: 'clave',
      }
      
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test("Error when username is not unique", async () => {
      const newUser = {
        name: 'root',
        username: 'root',
        password: 'clave'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect({"error": "expected `username` to be unique"})
    })

    test("Error when password length is minor than 3 characters", async () => {
      const newUser = {
        name: 'nuevo',
        username: 'nuevo',
        password: '2'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect({"error": 'The password length must be at lest 3 characters'})
    })

    test("Error when username length is shorter than 3 characters", async () => {
      const newUser = {
        name: 'nuevo',
        username: 'ot',
        password: 'nuevo'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect({"error": "User validation failed: username: Path `username` (`ot`) is shorter than the minimum allowed length (3)."})
    })

  })
  

})

after(async () => {
  await mongoose.connection.close()
})

