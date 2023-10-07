'use server';

// const OPENDOTA_API_KEY = process.env.OPENDOTA_API_KEY;
if (!process.env.DOTA_API_KEY) {
  throw new Error('Missing DOTA_API_KEY');
}
const DOTA_API_KEY = process.env.DOTA_API_KEY;

const fetchOpenDotaData = async <T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(
      `https://api.opendota.com/api/${endpoint}/?${queryParams}`
    );

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as T;
    if (!data) {
      throw new Error(`Data not found.`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching from OpenDota', error);
    throw new Error('Error fetching from OpenDota');
  }
};

const fetchDotaData = async <T>(
  endpoint: string,
  params: Record<string, string>
): Promise<T> => {
  try {
    const queryParams = new URLSearchParams({
      ...params,
      key: DOTA_API_KEY,
    }).toString();
    const response = await fetch(
      `https://api.steampowered.com/IDOTA2Match_570/${endpoint}/v1/?${queryParams}`
    );

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as T;
    if (!data) {
      throw new Error(`Data not found.`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching from Dota API', error);
    throw new Error('Error fetching from Dota API');
  }
};

export { fetchOpenDotaData, fetchDotaData };
