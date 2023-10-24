type Heroes = Record<number, string>;

interface HeroResponse {
  id: number;
  localized_name: string;
}

interface PlayerHero {
  id: number;
  name: string;
  wins: number;
  count: number;
  winRate: number;
}

interface HeroStats {
  name: string;
  count: number;
  winRate: number;
}
