/* eslint-disable indent */
import { State } from '~/store/'
import { ActionTypes } from '~/store/actions'

export const initialState: State = {
  items: {},
  top: [],
  new: [],
  ask: [],
  show: [],
  jobs: [],
}

const rootReducer = (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case 'RECEIVE_ITEMS':
      return { ...state, items: { ...state.items, ...action.items } }
    case 'RECEIVE_CATEGORY':
      return { ...state, [action.category]: action.ids }
    default:
      return state
  }
}

export default rootReducer
