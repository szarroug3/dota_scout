type Heroes = Record<number, string>;

interface PlayerHero {
  id: number;
  name: string;
  wins: number;
  count: number;
  winRate: number;
}

export type { Heroes, PlayerHero };
