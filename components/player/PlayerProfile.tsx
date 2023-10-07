import { useCallback, useEffect, useState } from 'react';
import {
  getOpenDotaPlayerHeroes,
  getOpenDotaPlayerInfo,
  getOpenDotaPlayerMatches,
} from '@/data/player';
import _ from 'lodash';

import { Heroes, PlayerHero } from '@/types/hero';
import { PlayerInfo } from '@/types/player';
import { cn } from '@/lib/utils';

import { removePlayerType } from '../Dashboard';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import PlayerProfileHeader from './PlayerProfileHeader';
import PlayerTable from './PlayerTable';

type refreshPlayerProfileType = () => void;
type removePlayerProfileType = () => void;

const PlayerProfile = ({
  playerId,
  heroes,
  hide,
  removePlayer,
}: {
  playerId: number;
  heroes: Heroes;
  removePlayer: removePlayerType;
  hide: boolean;
}) => {
  const [, setError] = useState();
  const [info, setInfo] = useState<PlayerInfo>({});
  const [loadingInfo, setLoadingInfo] = useState(true);

  const [loadingRecent, setLoadingRecent] = useState(true);
  const [recentlyPlayed, setRecentlyPlayed] = useState(new Array<PlayerHero>());

  const [loadingMost, setLoadingMost] = useState(true);
  const [mostPlayed, setMostPlayed] = useState(new Array<PlayerHero>());

  const getPlayerInfo = useCallback(async () => {
    setLoadingInfo(true);
    const data = await getOpenDotaPlayerInfo(playerId);
    setInfo(() => data);
    setLoadingInfo(false);
  }, [playerId]);

  const getPlayerRecentHeroes = useCallback(async () => {
    setLoadingRecent(true);
    const data = await getOpenDotaPlayerMatches(playerId, heroes);
    setRecentlyPlayed(() => data);
    setLoadingRecent(false);
  }, [heroes, playerId]);

  const getPlayerMostHeroes = useCallback(async (): Promise<void> => {
    setLoadingMost(true);
    const data = await getOpenDotaPlayerHeroes(playerId, heroes);
    setMostPlayed(() => data);
    setLoadingMost(false);
  }, [heroes, playerId]);

  const getPlayer = useCallback(() => {
    getPlayerInfo().catch((err) =>
      setError(() => {
        throw err;
      })
    );
    getPlayerRecentHeroes().catch((err) =>
      setError(() => {
        throw err;
      })
    );
    getPlayerMostHeroes().catch((err) =>
      setError(() => {
        throw err;
      })
    );
  }, [getPlayerInfo, getPlayerRecentHeroes, getPlayerMostHeroes]);

  useEffect(() => {
    if (!_.isEmpty(heroes)) {
      getPlayer();
    }
  }, [heroes, getPlayer]);

  return (
    <Card className={cn(hide && 'hidden')}>
      <PlayerProfileHeader
        playerId={playerId}
        data={info}
        loading={loadingInfo}
      />
      <Separator />
      <PlayerTable
        recentlyPlayed={recentlyPlayed}
        loadingRecent={loadingRecent}
        mostPlayed={mostPlayed}
        loadingMost={loadingMost}
        refreshPlayer={getPlayer}
        removePlayer={() => removePlayer(playerId)}
      />
    </Card>
  );
};

PlayerProfile.displayName = 'PlayerProfile';

export type { refreshPlayerProfileType, removePlayerProfileType };
export default PlayerProfile;
