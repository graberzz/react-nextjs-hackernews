import Nav from './Nav'
import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <header className="flex items-center bg-primary">
      <Link href="/">
        <a>
          <img src="/logo.svg" width="40" height="40" />
        </a>
      </Link>
      <div className="flex flex-col md:flex-row md:items-center">
        <Link href="/">
          <a className="font-bold">Next.js Hacker News</a>
        </Link>
        <Nav className="md:pl-6" />
      </div>
    </header>
  )
}

export default Header
