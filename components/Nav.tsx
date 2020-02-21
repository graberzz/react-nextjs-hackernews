import Link from 'next/link'
import { useRouter } from 'next/router'

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
      title: 'new',
      href: '/new',
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
  const router = useRouter()

  const getLinkClass = (href: string) => {
    return router.pathname === href ? 'text-white' : ''
  }

  return (
    <nav className={className}>
      <ul className="flex list-none m-0 p-0 text-xs">
        {MENU.map(item => (
          <li key={item.href}>
            <Link href={item.href}>
              <a className={getLinkClass(item.href)}>{item.title}</a>
            </Link>
            <span className="mx-1">|</span>
          </li>
        ))}
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/graberzz/react-nextjs-hackernews"
          >
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
