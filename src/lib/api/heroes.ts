'use server';

import { fetchOpenDotaAPI } from '@utils/api';

const fetchOpenDotaHeroes = async (): Promise<Array<HeroResponse>> => {
  console.info(`Getting heroes from OpenDota.`);
  return fetchOpenDotaAPI<Array<HeroResponse>>('heroes');
};

const getOpenDotaHeroes = async (): Promise<Heroes> => {
  const rawData = await fetchOpenDotaHeroes();
  const heroes: Heroes = {};
  return rawData.reduce((acc, hero) => {
    return {
      ...acc,
      [hero.id]: hero.localized_name,
    };
  }, heroes);
};

export { getOpenDotaHeroes };
