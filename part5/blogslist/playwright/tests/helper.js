const loginWith = async (page, username, password)  => {
  await page.getByTestId('input username').fill(username)
  await page.getByTestId('input password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, blogObject)  => {
  // Click create new button
  await page.getByRole('button', { name: 'Create new' }).click()
  // Add data in form
  await page.getByTestId('input title').fill(blogObject.title)
  await page.getByTestId('input author').fill(blogObject.author)
  await page.getByTestId('input url').fill(blogObject.url)
  // Create
  await page.getByRole('button', { name: 'create' }).click()
}

export { loginWith, createBlog }