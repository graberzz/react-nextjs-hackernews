import Header from '~/components/Header'
import Footer from './Footer'

const Layout: React.FC = ({ children }) => {
  return (
    <div className="w-full md:w-4/5 md:mx-auto">
      <Header />
      <main className="bg-background pt-4 pb-8">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
