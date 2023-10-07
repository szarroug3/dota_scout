'use server';

import { Match } from '@/types/match';

import { fetchOpenDotaData } from './api';

interface InputMatch {
  match_id: number;
}

const fetchOpenDotaMatchInfo = async (matchId: number) => {
  console.info(`Getting match ${matchId} from OpenDota.`);
  return fetchOpenDotaData<InputMatch>(`matches/${matchId}`);
};

const getOpenDotaMatchInfo = async (matchId: number): Promise<Match> => {
  const data = await fetchOpenDotaMatchInfo(matchId);

  return {
    matchId: data.match_id,
  };
};

export { getOpenDotaMatchInfo };
