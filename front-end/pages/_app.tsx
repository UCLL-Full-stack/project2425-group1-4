import NavBar from '@components/navigationBar';
import '@styles/index.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <NavBar />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
