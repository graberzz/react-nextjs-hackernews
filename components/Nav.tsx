import Link from 'next/link'

interface NavProps {
  className?: string
}

const Nav: React.FC<NavProps> = ({ className }) => {
  const MENU = [
    {
      title: 'top',
      href: '/top',
    },
    {
      title: 'ask',
      href: '/ask',
    },
    {
      title: 'show',
      href: '/show',
    },
    {
      title: 'jobs',
      href: '/jobs',
    },
  ]
  return (
    <nav className={className}>
      <ul className="flex list-none m-0 p-0 text-xs">
        {MENU.map(item => (
          <li key={item.href}>
            <Link href={item.href}>
              <a>{item.title}</a>
            </Link>
            <span className="mx-1">|</span>
          </li>
        ))}
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/graberzz/nextjs-blog"
          >
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
