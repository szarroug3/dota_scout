'use server';

import { Heroes, PlayerHero } from '@/types/hero';
import { PlayerInfo } from '@/types/player';

import { fetchOpenDotaData } from './api';

interface InputPlayerInfo {
  rank_tier: number;
  leaderboard_rank: number;
  profile: {
    personaname: string;
    avatarfull: string;
  };
}

interface InputPlayerHero {
  hero_id: number;
  win: number;
  games: number;
}

interface InputPlayerMatch {
  hero_id: number;
  radiant_win: boolean;
  player_slot: number;
}

const ranks: Record<string, string> = {
  '1': 'Herald',
  '2': 'Guardian',
  '3': 'Crusader',
  '4': 'Archon',
  '5': 'Legend',
  '6': 'Ancient',
  '7': 'Divine',
  '8': 'Immortal',
};

const fetchOpenDotaPlayerInfo = async (
  playerId: number
): Promise<InputPlayerInfo> => {
  console.info(`Getting player ${playerId} from OpenDota.`);
  return fetchOpenDotaData<InputPlayerInfo>(`players/${playerId}`);
};

const fetchOpenDotaPlayerHeroes = async (
  playerId: number
): Promise<Array<InputPlayerHero>> => {
  console.info(`Getting player ${playerId}'s heroes from OpenDota.`);
  return fetchOpenDotaData<Array<InputPlayerHero>>(
    `players/${playerId}/heroes`
  );
};

const fetchOpenDotaPlayerMatches = async (
  playerId: number
): Promise<Array<InputPlayerMatch>> => {
  console.info(`Getting player ${playerId}'s recent matches from OpenDota.`);
  const data = fetchOpenDotaData<Array<InputPlayerMatch>>(
    `players/${playerId}/matches`,
    {
      date: '90',
    }
  );
  return data;
};

const getOpenDotaPlayerInfo = async (playerId: number): Promise<PlayerInfo> => {
  const data = await fetchOpenDotaPlayerInfo(playerId);

  let medal = '0';
  let stars = '';
  let immortalRank = '';
  let altText = 'Unranked';
  const rankTier = data.rank_tier.toString();

  if (rankTier) {
    medal = rankTier[0];
    altText = ranks[medal];

    if (rankTier.startsWith('8')) {
      immortalRank = data.leaderboard_rank.toString();
      altText.concat(' ', immortalRank);
    } else {
      stars = rankTier[1];
      altText.concat(' ', stars);
    }
  }

  return {
    name: data.profile.personaname,
    picture: data.profile.avatarfull,
    rank: {
      altText,
      medal,
      stars,
      immortalRank,
    },
  };
};

const getOpenDotaPlayerHeroes = async (
  playerId: number,
  heroes: Heroes
): Promise<Array<PlayerHero>> => {
  const playerHeroes = await fetchOpenDotaPlayerHeroes(playerId);

  return playerHeroes.map(
    ({
      hero_id,
      win,
      games,
    }: {
      hero_id: number;
      win: number;
      games: number;
    }) => {
      return {
        id: hero_id,
        name: heroes[hero_id],
        wins: win,
        count: games,
        winRate: games > 0 ? win / games : 0,
      };
    }
  );
};

const getOpenDotaPlayerMatches = async (
  playerId: number,
  heroes: Heroes
): Promise<Array<PlayerHero>> => {
  const data = await fetchOpenDotaPlayerMatches(playerId);

  const heroCounts: Record<number, PlayerHero> = {};

  data.forEach(
    ({
      hero_id,
      radiant_win,
      player_slot,
    }: {
      hero_id: number;
      radiant_win: boolean;
      player_slot: number;
    }) => {
      heroCounts[hero_id] = heroCounts[hero_id] || {
        id: hero_id,
        name: heroes[hero_id],
        wins: 0,
        count: 0,
      };
      heroCounts[hero_id].count++;

      // Determine win or loss
      if (
        (player_slot > 100 && !radiant_win) ||
        (player_slot < 100 && radiant_win)
      ) {
        heroCounts[hero_id].wins++;
      }
    }
  );

  return Object.values(heroCounts).map((hero) => ({
    ...hero,
    winRate: hero.count > 0 ? hero.wins / hero.count : 0,
  }));
};

export {
  getOpenDotaPlayerInfo,
  getOpenDotaPlayerHeroes,
  getOpenDotaPlayerMatches,
};
