import type { NextPage } from 'next';
import Head from 'next/head';
import { api } from '../api';
import { FilmsTable } from '../components/Data/FilmsTable';
import { IFilm, IInitialState } from '../utils/models';

const Home: NextPage<IInitialState> = ({ films }) => {

  return (
    <div>
      <Head>
        <title>Films Duration SSR</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>Welcome to Films Duration</h1>
      <FilmsTable data={films} />
    </div>
  );
};

export const getStaticProps = async () => {
  let filmsID: any = [];
  let films: IFilm[] = [];

  let pages = 3;

  try {
    filmsID = [];
    films = [];

    const pagesArray: number[] = [];

    for (let i = 1; i <= pages; i += 1) {
      pagesArray.push(i);
    }

    const requests = pagesArray.map((page) => api.getTopRated(page));

    const response1 = await Promise.all(requests);
    response1.forEach((r) => {
      r.data.results.forEach((film: IFilm) => {
        filmsID.push(film.id);
      });
    });

    for await (const filmId of filmsID) {
      const response = await api.getFilmByID(filmId);
      films.push(response.data);
    }

  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      films: films,
    },
  };
};

export default Home;
