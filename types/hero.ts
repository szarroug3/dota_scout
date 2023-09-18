type Heroes = {
  [id: number]: string;
};

type PlayerHero = {
  id: number;
  name: string;
  wins: number;
  count: number;
  winRate: number;
};
export type { Heroes, PlayerHero };
