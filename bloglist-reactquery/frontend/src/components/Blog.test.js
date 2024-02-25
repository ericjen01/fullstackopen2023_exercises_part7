/* eslint-disable no-undef */
import Blog from './Blog'
import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

const blog = {
  title: 'Title of test blog',
  author: 'Antonio',
  likes: 10,
  url: 'funwithtest.com',
  user: {
    username: 'Monday'
  },
}

test('test blog gets rendered', async () => {

  render(<Blog blog={blog} />)

  const element = screen.getByText(
    'Title: Title of test blog / By: Antonio'
  )
  //screen.debug()
  //screen.debug(element)

  expect(element).toBeDefined()
})

test('test blog gets rendered v2, details button unclicked', async () => {
//
  const { container } = render(<Blog blog={blog} />)
  const url = container.querySelector('.url')
  const likes = container.querySelector('.likes')

  expect(url).toEqual(null)
  expect(likes).toEqual(null)

})

test('event handler responds eeach button click', async () => {

  const { container } = render(<Blog blog={blog}/>)
  const button = container.querySelector('.viewBtn')

  const user = userEvent.setup()
  await user.click(button)

  const url = container.querySelector('.url')
  const likes = container.querySelector('.likes')

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('clicking like button twice will call event handler prop twice', async () => {

  const user = userEvent.setup()
  const updateBlog = jest.fn()

  const { container } = render(<Blog blog={blog} updateBlog={updateBlog} />)
  const viewBtn = container.querySelector('.viewBtn')
  await user.click(viewBtn)

  const likeBtn = screen.getByText('Like')
  await user.click(likeBtn)
  await user.click(likeBtn)
  expect(updateBlog).toHaveBeenCalledTimes(2)
})