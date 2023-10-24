const mockMostPlayedHeroesResponse: Array<PlayerHeroResponse> = [
  {
    hero_id: 6,
    games: 876,
    win: 485,
  },
  {
    hero_id: 8,
    games: 393,
    win: 198,
  },
  {
    hero_id: 48,
    games: 277,
    win: 146,
  },
];

const mockMostPlayedHeroes: Array<PlayerHero> = [
  {
    id: 6,
    name: 'Drow Ranger',
    wins: 485,
    count: 876,
    winRate: 485 / 876,
  },
  {
    id: 8,
    name: 'Juggernaut',
    wins: 198,
    count: 393,
    winRate: 198 / 393,
  },
  {
    id: 48,
    name: 'Luna',
    wins: 146,
    count: 277,
    winRate: 146 / 277,
  },
];

export { mockMostPlayedHeroesResponse, mockMostPlayedHeroes };
