'use server';

import { Match } from '@/types/match';

import { fetchOpenDotaMatchInfo } from './api';
import { fetchFromCacheOrApi } from './common';

const getOpenDotaMatchInfo = async (matchId: number): Promise<Match> => {
  const cacheKey = `openDotaMatchInfo_${matchId}`;

  return fetchFromCacheOrApi(
    cacheKey,
    () => fetchOpenDotaMatchInfo(matchId),
    false
  ).then((matchInfo) => {
    if (!matchInfo) {
      throw new Error(`Couldn't get match info for ${matchId}.`);
    }

    const processedMatchInfo: Match = {
      matchId: matchId,
    };

    return processedMatchInfo;
  });
};

export { getOpenDotaMatchInfo };
