import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { createSelector, OutputSelector } from 'reselect'
import { HNItem, HNCategory } from '~/types'
import { State } from '~/store'
import {
  getItemById,
  getTopStories,
  getShowStories,
  getAskStories,
  getNewStories,
  getJobStories,
} from '~/api'

export interface FetchPartAction {
  type: 'FETCH_PART'
  count: number
}

export interface AddPartAction {
  type: 'ADD_PART'
  part: HNItem[]
}

export interface ReceiveItemsAction {
  type: 'RECEIVE_ITEMS'
  items: Record<number, HNItem>
}

export interface ReceiveCategoryAction {
  type: 'RECEIVE_CATEGORY'
  category: HNCategory
  ids: number[]
}

export type AppThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  State,
  null,
  ActionTypes
>

export type ActionTypes =
  | FetchPartAction
  | AddPartAction
  | ReceiveItemsAction
  | ReceiveCategoryAction

export type AppThunkDispatch = ThunkDispatch<State, null, ActionTypes>
export const receiveItems = (
  items: Record<number, HNItem>,
): ReceiveItemsAction => ({
  type: 'RECEIVE_ITEMS',
  items,
})

export const receiveItemsThunk = (
  ids: number[],
): AppThunkAction => async dispatch => {
  const items = (await Promise.all(ids.map(getItemById))).reduce(
    (map, item) => {
      map[item.id] = item
      return map
    },
    {} as Record<number, HNItem>,
  )

  dispatch(receiveItems(items))
}

const receiveCategory = (
  category: HNCategory,
  ids: number[],
): ReceiveCategoryAction => ({
  type: 'RECEIVE_CATEGORY',
  category,
  ids,
})

export const receiveCategoryThunk = (
  category: HNCategory,
): AppThunkAction => async dispatch => {
  const map: Record<HNCategory, () => Promise<number[]>> = {
    top: getTopStories,
    show: getShowStories,
    ask: getAskStories,
    new: getNewStories,
    jobs: getJobStories,
  }

  const ids = await map[category]()

  dispatch(receiveCategory(category, ids))
}
