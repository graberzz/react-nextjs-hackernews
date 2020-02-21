import { render } from '@testing-library/react'
import Footer from './Footer'

describe('<Footer />', () => {
  it('Matches snapshot', () => {
    const { container } = render(<Footer />)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <footer
          class=" p-4 bg-background border-solid border-0 border-t-2 border-primary text-center "
        >
          Footer!
        </footer>
      </div>
    `)
  })
})
