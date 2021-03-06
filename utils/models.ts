export interface IFilm {
  adult?: boolean;
  backdrop_path?: string;
  belongs_to_collection?: null | any;
  budget?: number;
  genres?: IGenres[];
  homepage?: string;
  id?: number;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: any[];
  production_countries?: any[];
  release_date?: string;
  revenue?: number;
  runtime?: number | undefined;
  spoken_languages?: any[];
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface IGenres {
  id: number;
  name: string;
}
export interface IInitialState {
  films: IFilm[];
}
export interface ITableProps {
  data: IFilm[];
}
export interface IMoviePageProps {
  film: IFilm;
}
export interface IPosterProps {
  film: IFilm;
  desktop: boolean,
}

export interface IDesktopBoolean {
  desktop: boolean,
}