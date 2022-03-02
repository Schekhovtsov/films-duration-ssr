import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NProgress from 'nprogress';
import '../public/nprogress.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Container } from '@mui/material';
import { observer } from 'mobx-react-lite';
import type { NextPage } from 'next';
import { api } from '../api';
import { FilmsTable } from '../components/FilmsTable';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { IFilm } from '../utils/models';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <div>
      <Navbar />
      <Container maxWidth="xl">
        <Component {...pageProps} />
        <Footer />
      </Container>
    </div>
  );
}

export default MyApp;
