import { makeAutoObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

export class Store {
  isInit = false;

  constructor() {
    makeAutoObservable(this);
  }

  initApp() {
    this.isInit = true;
  }

  hydrate = (data) => {
    if (!data) return

    //this.light = !!data.light
  }
}