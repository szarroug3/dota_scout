'use server';

import { revalidatePath } from 'next/cache';

if (!process.env.DOTA_API_KEY) {
  throw new Error('Missing DOTA_API_KEY');
}
const DOTA_API_KEY = process.env.DOTA_API_KEY;

const sanitize = (str: string): string => {
  return str.replaceAll(DOTA_API_KEY, '***');
};

const fetchUrl = async <T>(
  url: string,
  {
    params,
    method = 'GET',
    headers,
    json = true,
    revalidate = false,
  }: {
    params?: Record<string, string>;
    method?: string;
    headers?: Record<string, string>;
    json?: boolean;
    revalidate?: boolean;
  } = {}
): Promise<T> => {
  const queryParams = new URLSearchParams(params).toString();
  const urlWithParams = `${url}/?${queryParams}`;

  if (revalidate) {
    revalidatePath(urlWithParams);
  }

  const response: Response = await fetch(urlWithParams, {
    method: method,
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(
      `${sanitize(urlWithParams)}: ${response.status} ${response.statusText}`
    );
  }

  const data = json
    ? ((await response.json()) as T)
    : ((await response.text()) as T);

  if (!data) {
    throw new Error(`Data not found.`);
  }

  return data;
};

const fetchOpenDotaAPI = async <T>(
  endpoint: string,
  {
    params = {},
    method = 'GET',
    revalidate = false,
  }: {
    params?: Record<string, string>;
    method?: string;
    revalidate?: boolean;
  } = {}
): Promise<T> => {
  try {
    return (await fetchUrl(`https://api.opendota.com/api/${endpoint}`, {
      params,
      method,
      revalidate,
    })) as T;
  } catch (error) {
    console.error('Error fetching from OpenDota', error);
    throw new Error('Error fetching from OpenDota');
  }
};

const fetchDotaAPI = async <T>(
  endpoint: string,
  {
    params,
    revalidate,
  }: {
    params?: Record<string, string>;
    revalidate?: boolean;
  } = {}
): Promise<T> => {
  try {
    return (await fetchUrl(
      `https://api.steampowered.com/IDOTA2Match_570/${endpoint}/V1`,
      { params: { ...params, key: DOTA_API_KEY }, revalidate }
    )) as T;
  } catch (error) {
    console.error('Error fetching from Dota API', error);
    throw new Error('Error fetching from Dota API');
  }
};

export { fetchUrl, fetchOpenDotaAPI, fetchDotaAPI };
