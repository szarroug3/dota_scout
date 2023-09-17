import { Store } from "../vercel/store";

const store = new Store(`player`);

export class PlayerStore {
  async getProfile(playerId: number): Promise<any> {
    return store.get(`${playerId}-profile`, true);
  }

  setProfile(playerId: number, data: any) {
    store.set(`${playerId}-profile`, data);
  }

  async getMatches(playerId: number): Promise<any[]> {
    return store.get(`${playerId}-matches`, true);
  }

  setMatches(playerId: number, data: any) {
    store.set(`${playerId}-matches`, data);
  }
}