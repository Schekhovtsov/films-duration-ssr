import { observer } from 'mobx-react-lite';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import Navbar from '../components/AppBar';
import { useStore } from '../components/StoreProvider';

const Home: NextPage = observer(({ message }: any) => {
  const store = useStore();

  useEffect(() => {
    store.initApp();
    return () => {};
  }, [store]);

  return (
    <div>
      <Navbar />
      {store.isInit ? 'App is init' : 'App is Not Init'}
    </div>
  );
});

export const getServerSideProps = () => {
  return {
    props: { message: `Next.js is awesome` },
  };
};

export default Home;
