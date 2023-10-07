import { Player } from './player';

interface Match {
  matchId: number;
  firstPick?: boolean;
  radiantOrDire?: string;
  heroesPicked?: Array<string>;
  heroesBannedByTeam?: Array<string>;
  heroesBannedByEnemy?: Array<string>;
  captain?: Player;
  players?: Array<Player>;
  playerPositions?: Array<{
    player: Player;
    hero: string;
    position: string;
    role: string;
    isRoaming: boolean;
  }>;
}

export type { Match };
