import { render } from '@testing-library/react'
import Header from './Header'

describe('<Header />', () => {
  it('Matches snapshot', () => {
    const { container } = render(<Header />)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <header
          class=" flex items-center bg-primary"
        >
          <a
            href="/"
          >
            <img
              height="40"
              src="/logo.svg"
              width="40"
            />
          </a>
          <div
            class="flex flex-col md:flex-row md:items-center"
          >
            <a
              class="font-bold"
              href="/"
            >
              Next.js Hacker News
            </a>
            <nav
              class="md:pl-6"
            >
              <ul
                class="flex list-none m-0 p-0 text-xs"
              >
                <li>
                  <a
                    href="/top"
                  >
                    top
                  </a>
                  <span
                    class="mx-1"
                  >
                    |
                  </span>
                </li>
                <li>
                  <a
                    href="/ask"
                  >
                    ask
                  </a>
                  <span
                    class="mx-1"
                  >
                    |
                  </span>
                </li>
                <li>
                  <a
                    href="/show"
                  >
                    show
                  </a>
                  <span
                    class="mx-1"
                  >
                    |
                  </span>
                </li>
                <li>
                  <a
                    href="/jobs"
                  >
                    jobs
                  </a>
                  <span
                    class="mx-1"
                  >
                    |
                  </span>
                </li>
                <li>
                  <a
                    href="https://github.com/graberzz/nextjs-blog"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    `)
  })
})
