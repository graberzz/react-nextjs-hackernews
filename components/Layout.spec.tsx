import { render } from '@testing-library/react'
import Layout from './Layout'

describe('<Layout />', () => {
  it('Renders its children ', () => {
    const { getByText } = render(
      <Layout>
        <div>Hello, world!</div>
      </Layout>,
    )

    expect(getByText('Hello, world!')).toBeTruthy()
  })
})
