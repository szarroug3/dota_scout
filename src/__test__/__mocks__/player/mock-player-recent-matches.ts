const mockRecentMatchesResponse: Array<PlayerMatchResponse> = [
  {
    player_slot: 128,
    radiant_win: true,
    hero_id: 47,
  },
  {
    player_slot: 129,
    radiant_win: false,
    hero_id: 35,
  },
  {
    player_slot: 2,
    radiant_win: true,
    hero_id: 6,
  },
  {
    player_slot: 4,
    radiant_win: false,
    hero_id: 35,
  },
];

const mockRecentHeroes: Array<PlayerHero> = [
  {
    id: 35,
    name: 'Sniper',
    wins: 1,
    count: 2,
    winRate: 0.5,
  },
  {
    id: 6,
    name: 'Drow Ranger',
    wins: 1,
    count: 1,
    winRate: 1,
  },
  {
    id: 47,
    name: 'Viper',
    wins: 0,
    count: 1,
    winRate: 0,
  },
];

export { mockRecentMatchesResponse, mockRecentHeroes };
