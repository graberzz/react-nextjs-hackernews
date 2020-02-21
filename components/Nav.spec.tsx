import { render } from '@testing-library/react'
import Nav from './Nav'

describe('<Nav />', () => {
  it('adds className prop value to DOM', () => {
    const { container } = render(<Nav className="testing!" />)

    // It says classList does not exist on type 'ChildNode', but it does...
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(container?.firstChild?.classList.contains('testing!')).toBe(true)
  })
})
