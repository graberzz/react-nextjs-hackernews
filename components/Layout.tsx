import Header from '~/components/Header'
import Footer from '~/components/Footer'
import PropTypes from 'prop-types'

const Layout: React.FC = props => {
  return (
    <div className="w-full md:w-4/5 md:mx-auto">
      <Header />
      <div className="bg-background">{props.children}</div>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
}

export default Layout
