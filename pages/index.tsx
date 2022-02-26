import { Container, Divider } from '@mui/material';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { api } from '../api';
import { FilmsTable } from '../components/FilmsTable';
import Navbar from '../components/Navbar';
import { useStore } from '../components/StoreProvider';
import { IFilm } from '../utils/types';

export interface IInitialState {
  data: IFilm[]
}

const Home: NextPage = observer(({ initialState }: any) => {

  const store = useStore()

  useEffect(() => {
    store.initApp();
  }, [])

  return (
    <div>
      <Navbar />
      <Container maxWidth="xl">
        <div>
          <h1>Welcome</h1>
        </div>
        <FilmsTable /* data={store.filmsMobx} */ />
      </Container>
    </div>
  );
});

export const getServerSideProps = async () => {
  const title = 'Godfather';
  const page = 1;
  const response = await api.getFilmByTitle(title, page);

  return {
    props: {
      initialState: {
        data: response.data,
      },
    },
  };
};

export default Home;
