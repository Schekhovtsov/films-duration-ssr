import { makeAutoObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import { api } from '../api';
import { IFilm } from '../utils/types';

enableStaticRendering(typeof window === 'undefined');

export class Store {
  filmsMobx = {};
  isInit = false;

  isLoading = false;
  filmsID: any = [];
  films: IFilm[] = [];
  film: any;
  filmRuntime: number;
  wasSearched = false;

  constructor() {
    makeAutoObservable(this);
    this.filmRuntime = 0;
  }

  initApp = () => {
    this.isInit = true;
  };

  get getFilms() {
    return this.filmsMobx;
  }

  hydrate = (data: any) => {
    if (!data) return;
    this.filmsMobx = data;
  };

  fetchTopRatedIDs = async (pages = 1): Promise<void> => {
    try {
      this.isLoading = true;
      this.filmsID = [];
      this.films = [];
      this.film = {};

      const pagesArray: number[] = [];

      for (let i = 1; i <= pages; i += 1) {
        pagesArray.push(i);
      }

      const requests = pagesArray.map((page) => api.getTopRated(page));

      const temp: any[] = [];

      const response = await Promise.all(requests);
      response.forEach((r) => {
        r.data.results.forEach((film: IFilm) => {
          temp.push(film.id);
        });
      });

      this.filmsID = temp;

      this.fetchDetails('top');
    } catch (e) {
      console.log(e);
    }
  };

  fetchDetails = async (mode: string, id?: number) => {
    try {
      if (id === undefined) {
        // eslint-disable-next-line no-restricted-syntax
        for await (const filmId of this.filmsID) {
          const response = await api.getFilmByID(filmId);
          this.films.push(response.data);
        }
      } else {
        const response = await api.getFilmByID(id);
        this.film = response.data;
        this.filmRuntime = this.film.runtime;
      }

      if (mode === 'top') {
        this.films = this.films
          .filter((film: IFilm) => film.vote_count > 5000)
          .sort(
            (a: IFilm, b: IFilm) =>
              a.vote_average - b.vote_average || a.vote_count - b.vote_count
          );
      }

      if (mode === 'search') {
        this.films = this.films.sort(
          (a: IFilm, b: IFilm) =>
            a.vote_average - b.vote_average || a.vote_count - b.vote_count
        );
      }

      if (mode === 'page') {
        // Do nothing
      }
    } catch (e) {
      console.log(e);
    } finally {
      if (this.wasSearched) {
        this.isInit = false;
      } else {
        this.isInit = true;
      }
      this.wasSearched = false;
      this.isLoading = false;
    }
  };
}
