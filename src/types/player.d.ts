interface PlayerInfoResponse {
  rank_tier: number | null;
  leaderboard_rank: number | null;
  profile: {
    personaname: string;
    avatarfull: string;
  };
}

interface PlayerHeroResponse {
  hero_id: number;
  win: number;
  games: number;
}

interface PlayerMatchResponse {
  hero_id: number;
  radiant_win: boolean;
  player_slot: number;
}

interface PlayerInfo {
  name: string;
  picture: string;
  rank: {
    medal: number;
    stars?: number;
    immortalRank?: number;
    altText: string;
  };
}
