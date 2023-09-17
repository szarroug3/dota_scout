import { Store } from "../vercel/store";

const store = new Store();

export class MatchStore {
  async get(matchId: number) {
    return await store.get(`match-${matchId}`);
  }

  async set(matchId: number, data: any) {
    return await store.get(`match-${matchId}`, data);
  }
}
