import rootReducer, { initialState } from './'

describe('Root Reducer', () => {
  it('fills state with items', () => {
    const items = {
      123: { id: 123 },
    }
    expect(
      rootReducer(initialState, { type: 'RECEIVE_ITEMS', items }),
    ).toEqual({ ...initialState, items })
  })
})
