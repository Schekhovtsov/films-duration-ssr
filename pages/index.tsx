import { observer } from 'mobx-react-lite';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { api } from '../api';
import Navbar from '../components/AppBar';
import { useStore } from '../components/StoreProvider';

const Home: NextPage = observer(({ initialState }: any) => {
  const store = useStore();

  console.log('data from props: ', initialState.data.results)

  useEffect(() => {
    store.initApp();
    return () => {};
  }, [store]);

  return (
    <div>
      <Navbar />
      {store.isInit ? 'App is init' : 'App is Not Init'}
      {
        // initialState.data.results.map((test: any) => { <h1>test</h1> })
        //alert(Array.isArray(initialState.data.results))
      }
       
    </div>
  );
});

export const getServerSideProps = async () => {
  const title = 'Godfather';
  const response = await api.getFilmByTitle(title);

  return {
    props: {
      initialState: {
        data: response.data,
      },
    },
  };
};

export default Home;
