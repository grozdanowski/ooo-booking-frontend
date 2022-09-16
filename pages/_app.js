import 'styles/baseStyles.scss'
import TransitionEffect from 'utils/PageTransitionWrapper'

function MyApp({ Component, pageProps }) {
  return (
    <TransitionEffect>
      <Component {...pageProps} />
    </TransitionEffect>
  )
}

export default MyApp