import { Player } from './player';

interface Match {
  matchId: number;
  firstPick: boolean;
  radiantOrDire: string;
  heroesPicked: string[];
  heroesBannedByTeam: string[];
  heroesBannedByEnemy: string[];
  captain: Player;
  players: Player[];
  playerPositions: {
    player: Player;
    hero: string;
    position: string;
    role: string;
    isRoaming: boolean;
  }[];
}

type PartialMatch = Partial<Match> & { matchId: number };

export type { Match, PartialMatch };
