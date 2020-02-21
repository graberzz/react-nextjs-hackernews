import React from 'react'
import ItemComment from './ItemComment'
import { render, wait } from '@testing-library/react'
import { RenderHNItem, HNComment, RenderHNComment } from '~/types'

const item1: RenderHNComment = {
  id: 1,
  parent: 0,
  by: 'another_user',
  kids: [],
  text: 'someText',
  type: 'comment',
  deleted: false,
  time: 0,
  dead: false,
}

const item2: RenderHNComment = {
  id: 2,
  parent: 0,
  by: 'another_user',
  kids: [],
  text: 'someText',
  type: 'comment',
  deleted: false,
  time: 0,
  dead: false,
}
const item3: RenderHNComment = {
  id: 3,
  parent: 0,
  by: 'another_user',
  kids: [],
  text: 'someText',
  type: 'comment',
  deleted: false,
  time: 0,
  dead: false,
}

const item0: RenderHNComment = {
  id: 0,
  parent: -1,
  by: 'user',
  kids: [item1, item2, item3],
  text: 'someText',
  type: 'comment',
  deleted: false,
  time: 0,
  dead: false,
}

describe('<ItemComment />', () => {
  it('Renders comment data', async done => {
    const { getByTestId } = render(<ItemComment item={item1} />)
    await wait()
    expect(getByTestId('item-comment-text').textContent).toBe(item1.text)
    done()
  })

  it('Shows fold button when comment has >3 kids', async done => {
    const { getByTestId } = render(<ItemComment item={item0} />)
    await wait()
    expect(getByTestId('item-comment-fold-button')).toBeTruthy()
    done()
  })

  it('Does not show fold button when comment has <2 kids', async done => {
    const { queryByTestId } = render(<ItemComment item={item2} />)
    await wait()
    expect(queryByTestId('item-comment-fold-button')).toBeNull()
    done()
  })
})
