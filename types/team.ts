import { Match } from './match';
import { Player } from './player';

interface Team {
  teamId: number;
  name: string;
  players?: Player[];
  matches?: Match[];
  teamCaptain?: Player;
}

export type { Team };
