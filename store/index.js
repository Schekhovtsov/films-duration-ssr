import { makeAutoObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

export class Store {
  filmsMobx = {};
  isInit = false;

  constructor() {
    makeAutoObservable(this);
  }

  initApp = () => {
    this.isInit = true;
  }

  get getFilms() {
    return this.filmsMobx;
  }

  hydrate = (data) => {
    if (!data) return

    //this.light = !!data.light
    console.log('data from hydrate: ', data)
    this.filmsMobx = data.results;
    
  }
}