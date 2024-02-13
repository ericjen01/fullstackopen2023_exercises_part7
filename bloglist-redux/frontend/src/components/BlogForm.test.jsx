/* eslint-disable no-undef */
import React from 'react'
import BlogForm from './BlogForm'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'


test('BlogFrom calls onSubmit and updates parent states', async () => {

  const user = userEvent.setup()
  const createBlog = jest.fn()

  const { container } = render(<BlogForm createBlog={createBlog}/>)

  const url =  container.querySelector('#url')
  const title =  container.querySelector('#title')
  const author =  container.querySelector('#author')
  const submitBtn = container.querySelector('#create-btn')

  await user.type(url, 'testblog.com')
  await user.type(title, 'Title of test blog')
  await user.type(author, 'Antonio')
  await user.click(submitBtn)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog.mock.calls[0][0].title)
    .toBe(
      'Title of test blog'
    )

})