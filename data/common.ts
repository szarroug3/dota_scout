'use server';

import { kv } from '@vercel/kv';

const date = new Date();
const today =
  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

const cacheData = async (key: string, data: any) => {
  await kv.set(key, {
    data: data,
    date: today,
  });
};

const getCachedData = async (key: string, todayOnly: boolean) => {
  const value: { data: any; date: string } | null = await kv.get(key);
  if (!value || (todayOnly && value.date !== today)) {
    return null;
  }
  return value.data;
};

export const fetchFromCacheOrApi = async (
  cacheKey: string,
  apiFunction: () => Promise<any>,
  todayOnly: boolean = false,
  update: boolean = false
) => {
  if (!update) {
    console.log(`Getting ${cacheKey} from store.`);
    const cachedData = await getCachedData(cacheKey, todayOnly);

    if (cachedData) {
      console.log(`Got ${cacheKey} from store.`);
      return cachedData;
    }
  }

  console.log(`Getting ${cacheKey} from API.`);
  const rawData = await apiFunction();

  if (!rawData) {
    return null;
  }

  console.log(`Got ${cacheKey} from API.`);
  await cacheData(cacheKey, rawData);

  return rawData;
};
