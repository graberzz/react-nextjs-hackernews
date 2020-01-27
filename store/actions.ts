import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { HNItem } from '~/types'
import { State } from '~/store'
import { getItemById } from '~/api'

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

export type ActionTypes = FetchPartAction | AddPartAction | ReceiveItemsAction

export type AppThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  State,
  null,
  ActionTypes
>

export type AppThunkDispatch = ThunkDispatch<State, null, ActionTypes>
const receiveItems = (items: Record<number, HNItem>): ReceiveItemsAction => ({
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
