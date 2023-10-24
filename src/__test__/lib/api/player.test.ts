import {
  getOpenDotaPlayerHeroes,
  getOpenDotaPlayerInfo,
  getOpenDotaPlayerMatches,
} from '@api/player';
import { mockHeroesResponse } from '@mocks/heroes/heroes';
import {
  mockMostPlayedHeroes,
  mockMostPlayedHeroesResponse,
} from '@mocks/player/mock-player-heroes';
import {
  mockImmortalPlayer,
  mockImmortalPlayerResponse,
  mockNonImmortalPlayer,
  mockNonImmortalPlayerResponse,
  mockUnrankedPlayer,
  mockUnrankedPlayerResponse,
} from '@mocks/player/mock-player-info';
import {
  mockRecentHeroes,
  mockRecentMatchesResponse,
} from '@mocks/player/mock-player-recent-matches';
import * as api from '@utils/api';

describe('Player API', () => {
  describe('fetching player info', () => {
    it("should return the player's info for an unranked player", async () => {
      jest
        .spyOn(api, 'fetchOpenDotaAPI')
        .mockReturnValueOnce(Promise.resolve(mockUnrankedPlayerResponse));

      const info = await getOpenDotaPlayerInfo(1);
      expect(info).toStrictEqual(mockUnrankedPlayer);
    });

    it("should return the player's info for a non-immortal player", async () => {
      jest
        .spyOn(api, 'fetchOpenDotaAPI')
        .mockReturnValueOnce(Promise.resolve(mockNonImmortalPlayerResponse));

      const info = await getOpenDotaPlayerInfo(1);
      expect(info).toStrictEqual(mockNonImmortalPlayer);
    });

    it("should return the player's info for an immortal player", async () => {
      jest
        .spyOn(api, 'fetchOpenDotaAPI')
        .mockReturnValueOnce(Promise.resolve(mockImmortalPlayerResponse));

      const info = await getOpenDotaPlayerInfo(1);
      expect(info).toStrictEqual(mockImmortalPlayer);
    });

    it("should throw an error if the player's info cannot be retrieved", async () => {
      await expect(getOpenDotaPlayerInfo).rejects.toThrow();
    });
  });

  describe('getRecentHeroes', () => {
    it("should return the player's recent heroes", async () => {
      jest
        .spyOn(api, 'fetchOpenDotaAPI')
        .mockReturnValueOnce(Promise.resolve(mockHeroesResponse))
        .mockReturnValueOnce(Promise.resolve(mockRecentMatchesResponse));

      const heroes = await getOpenDotaPlayerMatches(1);
      expect(heroes).toStrictEqual(mockRecentHeroes);
    });

    it("should throw an error if the player's recently played heroes cannot be retrieved", async () => {
      await expect(getOpenDotaPlayerMatches).rejects.toThrow();
    });
  });

  describe('getMostPlayedHeroes', () => {
    it("should return the player's most played heroes", async () => {
      jest
        .spyOn(api, 'fetchOpenDotaAPI')
        .mockReturnValueOnce(Promise.resolve(mockHeroesResponse))
        .mockReturnValueOnce(Promise.resolve(mockMostPlayedHeroesResponse));

      const heroes = await getOpenDotaPlayerHeroes(1);
      expect(heroes).toStrictEqual(mockMostPlayedHeroes);
    });

    it("should throw an error if the player's most played heroes cannot be retrieved", async () => {
      await expect(getOpenDotaPlayerHeroes).rejects.toThrow();
    });
  });
});
