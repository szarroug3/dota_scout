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

import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import PlayerProfileHeader from './PlayerProfileHeader';
import PlayerTable from './PlayerTable';

const PlayerProfile = ({
  playerId,
  heroes,
  hide,
  removePlayer,
}: {
  playerId: number;
  heroes: Heroes;
  removePlayer: Function;
  hide: boolean;
}) => {
  const [info, setInfo] = useState<PlayerInfo>({});
  const [loadingInfo, setLoadingInfo] = useState(true);

  const [loadingRecent, setLoadingRecent] = useState(true);
  const [recentlyPlayed, setRecentlyPlayed] = useState(new Array<PlayerHero>());

  const [loadingMost, setLoadingMost] = useState(true);
  const [mostPlayed, setMostPlayed] = useState(new Array<PlayerHero>());

  const getPlayerInfo = useCallback(
    async (update: boolean = false) => {
      setLoadingInfo(true);
      getOpenDotaPlayerInfo(playerId, update)
        .then((data) => {
          if (data) {
            setInfo(data);
          }
        })
        .finally(() => setLoadingInfo(false));
    },
    [playerId]
  );

  const getPlayerRecentHeroes = useCallback(
    async (update: boolean = false) => {
      setLoadingRecent(true);
      getOpenDotaPlayerMatches(playerId, heroes, update)
        .then((data) => {
          if (data) {
            setRecentlyPlayed(() => data);
          }
        })
        .finally(() => {
          setLoadingRecent(false);
        });
    },
    [heroes, playerId]
  );

  const getPlayerMostHeroes = useCallback(
    async (update: boolean = false) => {
      setLoadingMost(true);
      getOpenDotaPlayerHeroes(playerId, heroes, update)
        .then((data) => {
          if (data) {
            setMostPlayed(() => data);
          }
        })
        .finally(() => {
          setLoadingMost(false);
        });
    },
    [heroes, playerId]
  );

  const refreshPlayer = async () => {
    getPlayerInfo(true);
    getPlayerRecentHeroes(true);
    getPlayerMostHeroes(true);
  };

  useEffect(() => {
    if (!_.isEmpty(heroes)) {
      getPlayerInfo();
      getPlayerRecentHeroes();
      getPlayerMostHeroes().finally(() => setLoadingMost(false));
    }
  }, [heroes, getPlayerInfo, getPlayerRecentHeroes, getPlayerMostHeroes]);

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
        refreshPlayer={refreshPlayer}
        removePlayer={() => removePlayer(playerId)}
      />
    </Card>
  );
};

export default PlayerProfile;

PlayerProfile.displayName = 'PlayerProfile';
