import { Store } from "../vercel/store";

const store = new Store('team');

export class TeamStore {
  async get(teamId: number) {
    return store.get(`${teamId}`);
  }

  async set(teamId: number, data: any) {
    return store.set(`${teamId}`, data);
  }
}


