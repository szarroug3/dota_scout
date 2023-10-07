'use server';

import { Team } from '@/types/team';

import { fetchDotaData } from './api';

interface InputTeam {
  team_id: number;
  name: string;
}

interface InputTeams {
  teams: Array<InputTeam>;
}

const fetchDotaTeamInfo = async (teamId: number): Promise<InputTeams> => {
  console.info(`Getting team ${teamId} from Dota API.`);
  return fetchDotaData<InputTeams>('GetTeamInfoByTeamID', {
    start_at_team_id: teamId.toString(),
    teams_requested: '1',
  });
};

const getDotaTeamInfo = async (teamId: number): Promise<Team> => {
  const data = await fetchDotaTeamInfo(teamId);

  const teamData = data.teams[0];

  const processedTeamInfo: Team = {
    teamId: teamId,
    name: teamData.name,
  };

  return processedTeamInfo;
};

export { getDotaTeamInfo };
