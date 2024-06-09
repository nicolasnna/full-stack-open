var _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((accumulator, current) => accumulator + current.likes, 0)
  return blogs.length === 0 ? 0 : total
}

const favoriteBlog = (blogs) => {
  const blogMaxLikes = blogs.reduce((maxValue, current) => current.likes >= maxValue.likes ? current : maxValue)
  delete blogMaxLikes.id
  delete blogMaxLikes.url
  return blogMaxLikes
}

const mostBlogs = (blogs) => {
  const groupAuthor =  _.map(
    _.groupBy(blogs, 'author'), 
    (elements => ({
      author: elements[0].author, 
      blogs: elements.length
    }))
  )
  const maxBlogsAuthor = _.maxBy(
    groupAuthor, 
    (element => {
    return element.blogs
    })
  )

  return maxBlogsAuthor
}

const mostLikes = (blogs) => {
  const groupAuthor =  _.map(
    _.groupBy(blogs, 'author'), 
    (elements => ({
      author: elements[0].author, 
      likes: totalLikes(elements)
    }))
  )
  const maxLikesAuthor = _.maxBy(groupAuthor, (element => {
    return element.likes
  }))

  return maxLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}