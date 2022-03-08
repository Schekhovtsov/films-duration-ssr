import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/system';
import Head from 'next/head';
import Image from 'next/image';
import { NextPage } from 'next/types';
import { api } from '../../api';
import { IFilm, IMoviePageProps } from '../../utils/models';

const Info = ({ film }: IMoviePageProps) => {
  return (
    <>
      <div>
        <Typography variant="h4" component="div" gutterBottom>
          {film.title}
        </Typography>
      </div>
      <div>
        <Typography variant="h5" component="div" gutterBottom>
          Score: {film.vote_average}
        </Typography>
      </div>
      <div>Runtime: {film.runtime && getHumanRuntime(film.runtime)}</div>

      <Typography
        variant="h6"
        component="div"
        sx={{
          marginTop: '3vh',
          textTransform: 'uppercase',
          letterSpacing: '-1px',
          '& .red': {
            padding: '5px',
            border: '2px solid #f0351d',
            color: '#f0351d',
          },
          '& .green': {
            padding: '5px',
            border: '2px solid #18e054',
            color: '#18e054',
          },
          '& .yellow': {
            padding: '5px',
            border: '2px solid #e4bc09',
            color: '#e4bc09',
          },
        }}
      >
        {film.runtime && film.runtime > 160 ? (
          <span className="red">It will take a long time</span>
        ) : film.runtime && film.runtime <= 100 && film.runtime < 160 ? (
          <span className="green">Сan watch</span>
        ) : (
          <span className="yellow">Could try</span>
        )}
      </Typography>
    </>
  );
};

const getHumanRuntime = (filmRuntime: number): string => {
  const hours = Math.trunc(filmRuntime / 60);
  const minutes = filmRuntime % 60;
  return `${hours} hours ${minutes} min`;
};

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
        <Wrapper>
          <ImageWrapper>
            <Poster desktop={desktop}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                alt={film.title}
                width={200}
                height={300}
              />
            </Poster>
          </ImageWrapper>
          <div>
            {desktop ? (
              <DesktopInfoWrapper>
                <Info film={film} />
              </DesktopInfoWrapper>
            ) : (
              <MobileInfoWrapper>
                <MobileInfoContent>
                  <Info film={film} />
                </MobileInfoContent>
              </MobileInfoWrapper>
            )}
          </div>
        </Wrapper>
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

const ImageWrapper = styled('div')(({
  display: 'flex',
  justifyContent: 'center',
}));
interface PosterProps {
  desktop: boolean,
}

const Poster = styled(ImageWrapper)<SomeProps>(({desktop}: any) => ({
  width: desktop ? 'auto' : '100vw',
}));

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});

const DesktopInfoWrapper = styled('div')({
  margin: '-8px 0 0 30px',
  minWidth: '350px',
});

const MobileInfoWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  margin: '30px auto',
  minWidth: '100vw',
});

const MobileInfoContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});