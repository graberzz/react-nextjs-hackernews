import Nav from './Nav'
import Link from 'next/link'

interface HeaderProps {
  className?: string
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={`${className} flex items-center bg-primary`}>
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

Header.defaultProps = {
  className: '',
}

export default Header
