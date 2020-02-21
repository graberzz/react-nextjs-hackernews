import { createStore, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { HNItem, HNCategory } from '~/types'
import rootReducer from './reducers'
import { ActionTypes } from './actions'
import { createSelector } from 'reselect'

export interface State {
  items: Record<number, HNItem>
  top: number[]
  new: number[]
  ask: number[]
  show: number[]
  jobs: number[]
}

export const createCategorySelector = (category: HNCategory) =>
  createSelector(
    [(state: State) => state, (state: State) => state[category]],
    (state, ids) => ids.map(id => state.items[id]).filter(Boolean),
  )

const middleware = [thunk]

export default (initialState: State): Store<State> =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
  )
