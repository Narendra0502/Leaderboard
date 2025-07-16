import '../styles/globals.css';
import { Toaster } from 'sonner';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}

export default MyApp;