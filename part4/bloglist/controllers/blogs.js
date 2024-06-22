const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate(
    'user',
    {username: 1, name: 1}
  )
  response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  // Validate if exist title or url
  if (!body.title || !body.url){
    response.status(400).end()
  }

  if (!request.user) {
    return response.status(401).json({ error: 'token invalid'})
  }
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token invalid'})
  }
  const user = request.user
  const blogSelected = await Blog.findById(request.params.id)

  if (blogSelected.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'This user cannot delete this blog' })
  }
}) 

blogsRouter.put('/:id', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token invalid'})
  }
  const user = request.user
  const blogSelected = await Blog.findById(request.params.id)

  if (blogSelected.user.toString() === user.id.toString()) {
    await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true})
    response.status(201).json(request.body)
  } else {
    response.status(401).json({ error: 'This user cannot modify this blog'})
  }
})

module.exports = blogsRouter