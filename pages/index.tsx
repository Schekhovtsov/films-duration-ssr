import { Container } from '@mui/material';
import { observer } from 'mobx-react-lite';
import type { NextPage } from 'next';
import { api } from '../api';
import { FilmsTable } from '../components/FilmsTable';
import Navbar from '../components/Navbar';
import { IFilm } from '../utils/models';

export interface IInitialState {
  data: IFilm[];
}

const Home: NextPage = observer(({ initialState }: any) => {
  const films = initialState.films;
  console.log(films)

  return (
    <div>
      <Navbar />
      <Container maxWidth="xl">
        <div>
          <h1>Welcome</h1>
        </div>
        <FilmsTable data={films} />
      </Container>
    </div>
  );
});

export const getServerSideProps = async () => {
  let isLoading = false;
  let filmsID: any = [];
  let films: IFilm[] = [];
  let film: any;

  let pages = 3;

  try {
    isLoading = true;
    filmsID = [];
    films = [];
    film = {};

    const pagesArray: number[] = [];

    for (let i = 1; i <= pages; i += 1) {
      pagesArray.push(i);
    }

    const requests = pagesArray.map((page) => api.getTopRated(page));

    const temp: any[] = [];

    const response1 = await Promise.all(requests);
    response1.forEach((r) => {
      r.data.results.forEach((film: IFilm) => {
        temp.push(film.id);
      });
    });

    filmsID = temp;

    for await (const filmId of filmsID) {
      const response = await api.getFilmByID(filmId);
      films.push(response.data);
    }

    films = films.filter((film: IFilm) => film.vote_count > 5000);
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      initialState: {
        films: films,
      },
    },
  };
};

export default Home;
