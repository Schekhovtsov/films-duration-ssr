import { Card, Paper } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { api } from '../api';
import { IMoviePageProps, IFilm } from '../utils/models';

const MoviePage: NextPage<IMoviePageProps> = ({ film }) => {
  return (
    <div>
      <Head>
        <title>{film.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Paper elevation={0} sx={{ my: '2rem' }}>
        <div><h1>{film.title}</h1></div>
        <div>Runtime: {film.runtime} minutes</div>
      </Paper>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  let film: IFilm = {};

  try {
    const response = await api.getFilmByID(context.params.filmId);
    film = response.data;
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      film,
    },
  };
};

export default MoviePage;
