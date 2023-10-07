'use server';

import { Heroes } from '@/types/hero';

import { fetchOpenDotaData } from './api';

interface InputHero {
  id: number;
  localized_name: string;
}

const fetchOpenDotaHeroes = async (): Promise<Array<InputHero>> => {
  console.info(`Getting heroes from OpenDota.`);
  return fetchOpenDotaData<Array<InputHero>>('heroes');
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
