'use server';

import { fetchOpenDotaAPI } from '@utils/api';

import { getOpenDotaHeroes } from './heroes';

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
  accountId: number,
  revalidate = false
): Promise<PlayerInfoResponse> => {
  console.info(`Getting player ${accountId} from OpenDota.`);
  return fetchOpenDotaAPI<PlayerInfoResponse>(`players/${accountId}`, {
    revalidate,
  });
};

const fetchOpenDotaPlayerHeroes = async (
  accountId: number,
  revalidate = false
): Promise<Array<PlayerHeroResponse>> => {
  console.info(`Getting player ${accountId}'s heroes from OpenDota.`);
  return fetchOpenDotaAPI<Array<PlayerHeroResponse>>(
    `players/${accountId}/heroes`,
    { revalidate }
  );
};

const fetchOpenDotaPlayerMatches = async (
  accountId: number,
  revalidate = false
): Promise<Array<PlayerMatchResponse>> => {
  console.info(`Getting player ${accountId}'s recent matches from OpenDota.`);
  const data = fetchOpenDotaAPI<Array<PlayerMatchResponse>>(
    `players/${accountId}/matches`,
    {
      params: {
        date: '90',
      },
      revalidate,
    }
  );
  return data;
};

const getOpenDotaPlayerInfo = async (
  accountId: number,
  revalidate = false
): Promise<PlayerInfo> => {
  const data = await fetchOpenDotaPlayerInfo(accountId, revalidate);

  let medal = 0;
  let stars;
  let immortalRank;
  let altText = 'Unranked';

  if (data.rank_tier) {
    const rankTier = data.rank_tier.toString();
    medal = Number(rankTier[0]);
    altText = ranks[medal];

    if (rankTier.startsWith('8')) {
      immortalRank = Number(data.leaderboard_rank);
      altText = altText.concat(' ', immortalRank.toString());
    } else {
      stars = Number(rankTier[1]);
      altText = altText.concat(' ', stars.toString());
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

const getOpenDotaPlayerMatches = async (
  accountId: number,
  revalidate = false
): Promise<Array<PlayerHero>> => {
  const [heroes, data] = await Promise.all([
    getOpenDotaHeroes(),
    fetchOpenDotaPlayerMatches(accountId, revalidate),
  ]);

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

  const result = Object.values(heroCounts).map((hero) => ({
    ...hero,
    winRate: hero.count > 0 ? hero.wins / hero.count : 0,
  }));

  result.sort((a, b) => {
    if (a.count !== b.count) {
      return b.count - a.count;
    }
    if (a.winRate !== b.winRate) {
      return b.winRate - a.winRate;
    }
    return a.name.localeCompare(b.name);
  });

  return result;
};

const getOpenDotaPlayerHeroes = async (
  accountId: number,
  revalidate = false
): Promise<Array<PlayerHero>> => {
  const [heroes, data] = await Promise.all([
    getOpenDotaHeroes(),
    fetchOpenDotaPlayerHeroes(accountId, revalidate),
  ]);

  const result = data.map(
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

  result.sort((a, b) => {
    if (a.count !== b.count) {
      return b.count - a.count;
    }
    if (a.winRate !== b.winRate) {
      return b.winRate - a.winRate;
    }
    return a.name.localeCompare(b.name);
  });

  return result;
};

export {
  getOpenDotaPlayerInfo,
  getOpenDotaPlayerMatches,
  getOpenDotaPlayerHeroes,
};
