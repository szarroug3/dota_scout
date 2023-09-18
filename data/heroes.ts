'use server';

import { Heroes } from '@/types/hero';

import { fetchOpenDotaHeroes } from './api';
import { fetchFromCacheOrApi } from './common';

interface InputHero {
  id: number;
  localized_name: string;
}

export const getOpenDotaHeroes = async (): Promise<Heroes | null> => {
  const cacheKey = 'openDotaHeroesRaw';

  const rawData = await fetchFromCacheOrApi(
    cacheKey,
    fetchOpenDotaHeroes,
    true
  );

  if (!rawData) {
    return null;
  }

  const heroes: Heroes = {};
  rawData.forEach((hero: InputHero) => (heroes[hero.id] = hero.localized_name));

  return heroes;
};
