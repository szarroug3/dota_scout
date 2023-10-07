import { Match } from './match';
import { Player } from './player';

interface Team {
  teamId: number;
  name: string;
  players?: Array<Player>;
  matches?: Array<Match>;
  teamCaptain?: Player;
}

export type { Team };
