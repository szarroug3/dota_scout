'use server';

import axios from 'axios';

// Define your API keys
const OPENDOTA_API_KEY = process.env.OPENDOTA_API_KEY;
const DOTA_API_KEY = process.env.DOTA_API_KEY;

// Create Axios instances
const openDotaInstance = axios.create({
  baseURL: 'https://api.opendota.com/api/',
  // headers: { 'X-API-Key': OPENDOTA_API_KEY },
});

const dotaApiInstance = axios.create({
  baseURL: 'https://api.steampowered.com/IDOTA2Match_570/',
});

const fetchOpenDotaData = async (
  endpoint: string,
  params: Record<string, string | number> = {}
) => {
  return openDotaInstance
    .get(endpoint, {
      params: params,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(`Error fetching OpenDota data: ${error}`);
      throw error;
    });
};

const fetchDotaData = async (
  endpoint: string,
  params: Record<string, string | number>
) => {
  return dotaApiInstance
    .get(`${endpoint}/v1/`, {
      params: { ...params, key: DOTA_API_KEY },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(`Error fetching Dota data: ${error}`);
      throw error;
    });
};

const fetchOpenDotaHeroes = async () => {
  return fetchOpenDotaData('heroes');
};

const fetchOpenDotaPlayerInfo = async (playerId: number) => {
  return fetchOpenDotaData(`players/${playerId}`);
};

const fetchOpenDotaMatchInfo = async (matchId: number) => {
  return fetchOpenDotaData(`matches/${matchId}`);
};

const fetchOpenDotaPlayerHeroes = async (playerId: number) => {
  return fetchOpenDotaData(`players/${playerId}/heroes`);
};

const fetchOpenDotaPlayerMatches = async (playerId: number) => {
  return fetchOpenDotaData(`players/${playerId}/matches`, {
    date: 90,
  });
};

const fetchDotaTeamInfo = async (teamId: number) => {
  return fetchDotaData('GetTeamInfoByTeamID', {
    start_at_team_id: teamId,
    teams_requested: '1',
  });
};

export {
  fetchOpenDotaHeroes,
  fetchOpenDotaPlayerInfo,
  fetchOpenDotaMatchInfo,
  fetchOpenDotaPlayerHeroes,
  fetchOpenDotaPlayerMatches,
  fetchDotaTeamInfo,
};
