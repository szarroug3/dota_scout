'use client';

import { ReactElement, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getOpenDotaHeroes } from '@/data/heroes';
import { ToastAction } from '@radix-ui/react-toast';
import _ from 'lodash';

import { Heroes } from '@/types/hero';

import ErrorBoundary from './ErrorBoundary';
import MatchInfo from './match/MatchInfo';
import PlayerProfile from './player/PlayerProfile';
import InputForm from './SingleInputForm';
import { Card } from './ui/card';
import { useToast } from './ui/use-toast';

interface addInputType {
  (_inputId: number): Promise<void>;
}

const Dashboard = (): ReactElement => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const inputPlayerIds = searchParams.getAll('playerId') || new Array<String>();
  const [playerIds, setPlayerIds] = useState(
    new Map(inputPlayerIds.map((id) => [Number(id), false]))
  );

  const inputMatchIds = searchParams.getAll('matchId') || new Array<String>();
  const [matchIds, setMatchIds] = useState(
    inputMatchIds.map((id) => Number(id))
  );

  const [heroes, setHeroes] = useState<Heroes>({});

  useEffect(() => {
    if (_.isEmpty(heroes)) {
      getOpenDotaHeroes().then((openDotaHeroes) => {
        if (openDotaHeroes) {
          setHeroes(() => openDotaHeroes);
        }
      });
    }
  }, [heroes]);

  const addMatch = async (matchId: number) => {
    if (!matchIds.includes(matchId)) {
      setMatchIds([...matchIds, matchId]);
      updateUrl();
    }
  };

  const addPlayer = async (playerId: number) => {
    setPlayerIds((ids) => ids.set(playerId, false));
    updateUrl();
  };

  const removePlayer = async (playerId: number) => {
    setPlayerIds((ids) => ids.set(playerId, true));
    updateUrl();
  };

  const updateUrl = async () => {
    const params = matchIds.map((id) => `matchId=${id}`);
    params.push(
      ...Array.from(playerIds.entries())
        .filter(([, hide]) => !hide)
        .map(([id]) => `playerId=${id}`)
    );

    if (params) {
      router.push(`${pathName}?${params.join('&')}`, { scroll: false });
    } else {
      router.push(`${pathName}`, { scroll: false });
    }
  };

  const onError = (message: string) => {
    toast({
      variant: 'destructive',
      title: 'Shit!',
      description: message,
      action: <ToastAction altText={message}>Try again.</ToastAction>,
    });
  };

  return (
    <div className='flex w-full flex-col gap-6'>
      <div className='flex justify-center gap-6'>
        <InputForm param={'Match'} onSubmit={addMatch} />
        <InputForm param={'Player'} onSubmit={addPlayer} />
      </div>
      <div className='flex flex-col justify-center gap-6'>
        <div className='flex flex-wrap justify-center gap-6'>
          <Card>
            {matchIds.map((matchId) => (
              <ErrorBoundary
                onError={() => onError(`Couldn't get match ${matchId}.`)}
                key={`player-${matchId}-error`}
                fallback={<></>}
              >
                <MatchInfo
                  key={`match-${matchId}`}
                  matchId={matchId}
                  heroes={heroes}
                />
              </ErrorBoundary>
            ))}
          </Card>
        </div>
        <div className='flex flex-wrap justify-center gap-6'>
          {Array.from(playerIds.entries()).map(([playerId, hide]) => (
            <ErrorBoundary
              onError={() => onError(`Couldn't get player ${playerId}.`)}
              key={`player-${playerId}-error`}
              fallback={<></>}
            >
              <PlayerProfile
                key={`player-${playerId}`}
                playerId={playerId}
                heroes={heroes}
                hide={hide}
                removePlayer={removePlayer}
              />
            </ErrorBoundary>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
export type { addInputType };
