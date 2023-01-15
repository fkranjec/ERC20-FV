import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MetamaskProvider } from '../components/Metamask'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MetamaskProvider>
      <Component {...pageProps} />
      <ToastContainer
        position='top-right'
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnHover
      />
    </MetamaskProvider>);
}
