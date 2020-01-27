import { AnyAction, Action, Store } from 'redux'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import App, { AppContext } from 'next/app'
import 'nprogress/nprogress.css'
import configureStore, { State } from '~/store/'
import { ActionTypes } from '~/store/actions'
import '~/styles.css'
import Layout from '~/components/Layout'
import '~/plugins/nprogress'

interface MyAppContext extends AppContext {
  store: Store<State, ActionTypes>
}

class MyApp extends App<MyAppContext> {
  static async getInitialProps({ Component, ctx }: any): Promise<any> {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}

    return { pageProps }
  }
  render(): JSX.Element {
    const { Component, store, pageProps } = this.props
    return (
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    )
  }
}
declare module 'next/dist/next-server/lib/utils' {
  export interface NextPageContext<S = any, A extends Action = AnyAction> {
    /**
     * Provided by next-redux-wrapper: Whether the code is executed on the server or the client side
     */
    isServer: boolean

    /**
     * Provided by next-redux-wrapper: The redux store
     */
    store: Store<S, A>
  }
}

export default withRedux(configureStore)(MyApp)
