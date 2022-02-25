import { Container } from '@mui/material';
import { observer } from 'mobx-react-lite';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { api } from '../api';
import { FilmsTable } from '../components/FilmsTable';
import Navbar from '../components/Navbar';
import { useStore } from '../components/StoreProvider';
import { IFilm } from '../utils/types';

// export interface IInitialState {
//   data: IFilm[]
// }

const Home: NextPage = observer(({ initialState }: any ) => {

  const films: IFilm[] = initialState.data.results;
  const store = useStore();

  useEffect(() => {
    store.initApp();
    return () => {};
  }, [store]);

  return (
    <div>
      <Navbar />
      <Container maxWidth="xl">
        <FilmsTable data={films} />
      </Container>
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
