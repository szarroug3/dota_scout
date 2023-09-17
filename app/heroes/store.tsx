import { Store } from "../vercel/store";

const store = new Store();

export class HeroStore {
  async get() {
    return store.get(`heroes`);
  }

  async set(heroes: any) {
    return store.set(`heroes`, heroes);
  }
}

