'use server';

import { Team } from '@/types/team';

import { fetchDotaTeamInfo } from './api';
import { fetchFromCacheOrApi } from './common';

export const getDotaTeamInfo = async (teamId: number): Promise<Team | null> => {
  const cacheKey = `dotaTeamInfo_${teamId}`;

  const teamInfo = await fetchFromCacheOrApi(
    cacheKey,
    () => fetchDotaTeamInfo(teamId),
    false
  );

  if (!teamInfo) {
    return null;
  }

  const teamData = teamInfo.teams[0];

  const processedTeamInfo: Team = {
    teamId: teamId,
    name: teamData.name,
  };

  return processedTeamInfo;
};
