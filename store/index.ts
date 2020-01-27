import { createStore, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { HNItem } from '~/types'
import rootReducer from './reducers'

export interface State {
  items: Record<number, HNItem>
  top: number[]
  new: number[]
  ask: number[]
  show: number[]
}

const middleware = [thunk]

export default (initialState: State): Store<State> =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
  )
