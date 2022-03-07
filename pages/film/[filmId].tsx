import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Head from 'next/head';
import Image from 'next/image';
import { NextPage } from 'next/types';
import { api } from '../../api';
import { IMoviePageProps, IFilm } from '../../utils/models';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Info = ({ film }: IMoviePageProps) => {
  return (
    <div>
      <div>
        <h1>{film.title}</h1>
      </div>
      <div>Score: {film.vote_average} minutes</div>
      <div>Runtime: {film.runtime && getHumanRuntime(film.runtime)}</div>

    </div>
  );
};

const getHumanRuntime = (filmRuntime: number): string => {
  const hours = Math.trunc(filmRuntime / 60);
  const minutes = filmRuntime % 60;
  return `${hours} hours ${minutes} min`;
}

const MoviePage: NextPage<IMoviePageProps> = ({ film }) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div>
      <Head>
        <title>{film.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Paper elevation={0} sx={{ my: '2rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Item>
              <Image
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                alt={film.title}
                width={200}
                height={300}
              />
            </Item>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Item>
              {desktop ? (
                <DesktopInfoWrapper>
                  <Info film={film} />
                </DesktopInfoWrapper>
              ) : (
                <MobileInfoWrapper>
                  <Info film={film} />
                </MobileInfoWrapper>
              )}
            </Item>
          </Grid>
        </Grid>
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

const Item = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const DesktopInfoWrapper = styled('div')({
  margin: '-30px 0 0 10px',
});

const MobileInfoWrapper = styled('div')({
  margin: '0 0 0 0',
});
