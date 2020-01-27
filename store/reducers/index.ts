/* eslint-disable indent */
import { State } from '~/store/'
import { ActionTypes } from '~/store/actions'

const initialState: State = {
  items: {},
  top: [],
  new: [],
  ask: [],
  show: [],
}

const rootReducer = (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case 'RECEIVE_ITEMS':
      return { ...state, items: { ...state.items, ...action.items } }
    default:
      return state
  }
}

export default rootReducer
