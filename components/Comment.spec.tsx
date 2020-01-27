import { getItemById } from '~/api'
import React from 'react'
import Comment from './Comment'
import { render, wait } from '@testing-library/react'

jest.mock('~/api')

const mockedGetItemById = getItemById as jest.Mock<
  ReturnType<typeof getItemById>
>
afterAll(() => {
  jest.unmock('~/api')
  mockedGetItemById.mockRestore()
})
it('Renders comment data', async done => {
  const mockComment = {
    text: 'Joni Baez',
  }

  mockedGetItemById.mockResolvedValueOnce(mockComment)
  const { getByTestId } = render(<Comment id="22157423" />)
  await wait()
  expect(getByTestId('text').textContent).toBe(mockComment.text)
  done()
})
