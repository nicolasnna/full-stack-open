const { test, expect, beforeEach, describe } = require('@playwright/test')
const loginWith = require('./helper').loginWith
const createBlog = require('./helper').createBlog

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'admin',
        username: 'admin',
        password: 'root'
      }
    })
    // Add other user
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'user',
        username: 'user',
        password: 'userpass'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    // Check if title is show
    await expect(page.getByText('Login in to application')).toBeVisible()
    // Check Inputs
    await expect(page.getByTestId('input username')).toBeVisible()
    await expect(page.getByTestId('input password')).toBeVisible()
  })

  describe('Login', () => {
    test('succedes with correct credentials', async ({ page }) => {
      // Write credentials
      await loginWith(page, 'admin', 'root')
      // Expect
      await expect(page.getByText('blogs')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      // Write credentials
      await loginWith(page, 'user', 'pass')
      // Expect
      await expect(page.getByText('Login in to application')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      // Write credentials
      await loginWith(page, 'admin','root')
    })

    test('a new blog can be create', async ({ page }) => {
      const newBlog = {
        title: 'Nuevo blog',
        author: 'nicolas',
        url: 'www.new.blog.cl'
      }
      await createBlog(page, newBlog)
      // Validate
      await expect(page.getByText('Nuevo blog nicolas')).toBeVisible()
    })

    describe('When new blog is created', () => {
      beforeEach(async ({ page }) => {
        const newBlog = {
          title: 'Nuevo blog',
          author: 'nicolas',
          url: 'www.new.blog.cl'
        }
        await createBlog(page, newBlog)
      })

      test('Can increment like blog', async ({ page }) => {
        // Expand vlog list
        await page.getByRole('button', {name:'show'}).click()
        // Validate 0 default likes
        await expect(page.getByText('0')).toBeVisible()
        // Click like
        await page.getByRole('button', {name:'like'}).click()
        // Validate that like increment in 1
        await expect(page.getByText('1')).toBeVisible()
      })

      test('Can delete own blog', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept())
        const blogToDelete = page.getByText('Nuevo blog nicolas')
        // Expand blog detail
        await page.getByRole('button', {name:'show'}).click()
        // Validate button delete
        await expect(page.getByRole('button',{name:'Delete'})).toBeVisible()
        // Delete
        await page.getByRole('button',{name:'Delete'}).click()
        
        await expect(blogToDelete).toHaveCount(0)
      })

      test('Cannot delete blog of other user', async ({ page }) => {
        // logout
        await page.getByRole('button',{name:'Logout'}).click()
        await loginWith(page, 'user', 'userpass')
        // Expand blogs details
        await page.getByRole('button', {name:'show'}).click()
        // Validate that not exist button delete
        await expect(page.getByRole('button',{name:'Delete'})).toHaveCount(0)
      })

      test('Check that first blog has more likes', async ({ page }) => {
        const otherBlog = {
          title: 'segundo blog',
          author: 'nicolas',
          url: 'www.new.blog.cl'
        }
        await createBlog(page, otherBlog)

        const firstBlogCreated = await page.getByText('Nuevo blog nicolas')
        const locatorFirst = await firstBlogCreated.locator('..')
        await locatorFirst.getByRole('button', {name:'show'}).click()

        const secondBlogCreated = await page.getByText('segundo blog nicolas')
        const locatorSecond = await secondBlogCreated.locator('..')

        await locatorSecond.getByRole('button', {name:'show'}).click()

        await locatorSecond.getByRole('button', {name:'like'}).click()
        // Check order of blogs
        const listBlogs = await page.getByTestId('blog card')
        const firstBlog = await listBlogs.nth(0).getByText('segundo blog nicolas')
        await expect(firstBlog).toBeVisible()
       
      })
    })

  })
})