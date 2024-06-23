const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

const listWithOneBlog = testHelper.oneBlog
const listWithMultipleBlogs = testHelper.listBlogs


describe('Dummy', () => {
  test('returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

describe('Total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('Favorite Blog', () => {
  test('of blog with biggest likes', () => {
    const expectedFavorite = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    }
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    assert.deepStrictEqual(result, expectedFavorite )
  })
})

describe('Most Blog', () => {
  test('of author with most blogs', () => {
    const expected = {
      author: "Robert C. Martin",
      blogs: 3
    }
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    assert.deepStrictEqual(result, expected)
  })
})

describe('Most Likes', () => {
  test('of author with most likes', () => {
    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    assert.deepStrictEqual(result, expected)
  })

})
describe('Search id by title', () => {
  test('When blog exist', () =>{
    const result = listHelper.searchIdByTitle(listWithMultipleBlogs, listWithMultipleBlogs[0].title)
    assert.strictEqual(result, listWithMultipleBlogs[0].id)
  })
})

