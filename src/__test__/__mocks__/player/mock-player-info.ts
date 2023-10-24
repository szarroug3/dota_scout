const mockUnrankedPlayerResponse: PlayerInfoResponse = {
  rank_tier: null,
  profile: {
    personaname: 'tar bomba',
    avatarfull:
      'https://avatars.steamstatic.com/a987751653874be789cee2933e48a12d646c12c6_full.jpg',
  },
  leaderboard_rank: 1127,
};

const mockUnrankedPlayer: PlayerInfo = {
  name: 'tar bomba',
  picture:
    'https://avatars.steamstatic.com/a987751653874be789cee2933e48a12d646c12c6_full.jpg',
  rank: {
    medal: 0,
    immortalRank: undefined,
    stars: undefined,
    altText: 'Unranked',
  },
};

const mockNonImmortalPlayerResponse: PlayerInfoResponse = {
  rank_tier: 53,
  profile: {
    personaname: 'Fawkes',
    avatarfull:
      'https://avatars.steamstatic.com/0636f2525d28ea7b62ff791ca4a513ddda0a9318_full.jpg',
  },
  leaderboard_rank: null,
};

const mockNonImmortalPlayer: PlayerInfo = {
  name: 'Fawkes',
  picture:
    'https://avatars.steamstatic.com/0636f2525d28ea7b62ff791ca4a513ddda0a9318_full.jpg',
  rank: {
    medal: 5,
    immortalRank: undefined,
    stars: 3,
    altText: 'Legend 3',
  },
};

const mockImmortalPlayerResponse: PlayerInfoResponse = {
  profile: {
    personaname: 'FatSloth',
    avatarfull:
      'https://avatars.steamstatic.com/58ed0d76a206c5d9ecb5d41346a6b0573394eae2_full.jpg',
  },
  rank_tier: 80,
  leaderboard_rank: 2754,
};

const mockImmortalPlayer: PlayerInfo = {
  name: 'FatSloth',
  picture:
    'https://avatars.steamstatic.com/58ed0d76a206c5d9ecb5d41346a6b0573394eae2_full.jpg',
  rank: {
    medal: 8,
    immortalRank: 2754,
    stars: undefined,
    altText: 'Immortal 2754',
  },
};

export {
  mockUnrankedPlayerResponse,
  mockUnrankedPlayer,
  mockNonImmortalPlayerResponse,
  mockNonImmortalPlayer,
  mockImmortalPlayerResponse,
  mockImmortalPlayer,
};
