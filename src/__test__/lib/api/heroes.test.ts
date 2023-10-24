import { getOpenDotaHeroes } from '@api/heroes';
import { mockHeroes, mockHeroesResponse } from '@mocks/heroes/heroes';
import * as api from '@utils/api';

describe('Heroes API', () => {
  describe('fetching heroes', () => {
    it('should return the heroes', async () => {
      jest
        .spyOn(api, 'fetchOpenDotaAPI')
        .mockReturnValueOnce(Promise.resolve(mockHeroesResponse));

      const heroes = await getOpenDotaHeroes();
      expect(heroes).toStrictEqual(mockHeroes);
    });

    it('should throw an error if the heroes cannot be retrieved', async () => {
      jest
        .spyOn(api, 'fetchOpenDotaAPI')
        .mockRejectedValueOnce(new Error(`Couldn't get heroes.`));

      await expect(getOpenDotaHeroes).rejects.toThrow();
    });
  });
});
