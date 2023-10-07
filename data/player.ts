'use server';

import { Heroes, PlayerHero } from '@/types/hero';
import { PlayerInfo } from '@/types/player';

import {
  fetchOpenDotaPlayerHeroes,
  fetchOpenDotaPlayerInfo,
  fetchOpenDotaPlayerMatches,
} from './api';
import { fetchFromCacheOrApi } from './common';

const ranks: { [key: string]: string } = {
  '1': 'Herald',
  '2': 'Guardian',
  '3': 'Crusader',
  '4': 'Archon',
  '5': 'Legend',
  '6': 'Ancient',
  '7': 'Divine',
  '8': 'Immortal',
};

const getOpenDotaPlayerInfo = async (
  playerId: number,
  update: boolean
): Promise<PlayerInfo> => {
  const cacheKey = `openDotaPlayerInfo_${playerId}`;

  const playerInfo = await fetchFromCacheOrApi(
    cacheKey,
    () => fetchOpenDotaPlayerInfo(playerId),
    true,
    update
  );

  if (!playerInfo) {
    throw new Error(`Couldn't get player info for ${playerId}.`);
  }

  let medal = '0';
  let stars = '';
  let immortalRank = '';
  let altText = 'Unranked';

  if (playerInfo.rank_tier) {
    const rankTier = playerInfo.rank_tier.toString();
    medal = rankTier[0];
    altText = ranks[medal];

    if (rankTier[0] === '8') {
      immortalRank = playerInfo.leaderboard_rank;
      altText.concat(' ', immortalRank);
    } else {
      stars = rankTier[1];
      altText.concat(' ', stars);
    }
  }

  return {
    name: playerInfo.profile.personaname,
    picture: playerInfo.profile.avatarfull,
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
  heroes: Heroes,
  update: boolean
): Promise<Array<PlayerHero>> => {
  const cacheKey = `openDotaPlayerHeroes_${playerId}`;

  const playerHeroes = await fetchFromCacheOrApi(
    cacheKey,
    () => fetchOpenDotaPlayerHeroes(playerId),
    true,
    update
  );

  if (!heroes) {
    throw new Error(`Couldn't get player heroes for ${playerId}.`);
  }

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
  heroes: Heroes,
  update: boolean
): Promise<Array<PlayerHero>> => {
  const cacheKey = `openDotaPlayerMatches_${playerId}`;

  const matches = await fetchFromCacheOrApi(
    cacheKey,
    () => fetchOpenDotaPlayerMatches(playerId),
    true,
    update
  );

  if (!matches) {
    throw new Error(`Couldn't get player matches for ${playerId}.`);
  }

  const heroCounts: { [id: number]: PlayerHero } = {};

  matches.forEach(
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
