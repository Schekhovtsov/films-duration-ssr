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
import { yellow } from '@mui/material/colors';
import MuiBox from "@mui/material/Box";

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
        <MyFlex>
          <ImageWrapper>
            { desktop
            ? (<Poster desktop>
            <Image
               src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
               alt={film.title}
               width={200}
               height={300}
             />
            </Poster>)
          : (<Poster>
            <Image
               src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
               alt={film.title}
               width={200}
               height={300}
             />
            </Poster>)
           }          
          </ImageWrapper>
          <div>
            {desktop ? (
              <DesktopInfoWrapper>
                <Info film={film} />
              </DesktopInfoWrapper>
            ) : (
              <MobileInfoWrapper>
                <Info film={film} />
              </MobileInfoWrapper>
            )}
          </div>
        </MyFlex>
    
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

const ImageWrapper = styled('div')(({desktop}: any) => ({
  display: 'flex',
  justifyContent: 'center',
}));

const Poster = styled(ImageWrapper, {
  shouldForwardProp: (prop) => prop !== "desktop"
})(({ desktop }: any ) => ({
  width: desktop ? 'auto' : '100vw',
}));

const MyFlex = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});

const DesktopInfoWrapper = styled('div')({
  margin: '-30px 0 0 30px',
  minWidth: '350px',
  backgroundColor: 'yellow',
});

const MobileInfoWrapper = styled('div')({
  margin: '0 0 0 0',
  minWidth: '350px',
});


