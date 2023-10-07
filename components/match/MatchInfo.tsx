'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { getOpenDotaMatchInfo } from '@/data/match';
import _ from 'lodash';

import { Heroes } from '@/types/hero';
import { Match } from '@/types/match';
import Loading from '@/app/loading';

import { Card } from '../ui/card';

const MatchInfo = ({
  matchId,
  heroes,
}: {
  matchId: number;
  heroes: Heroes;
}) => {
  const [matchInfo, setMatchInfo] = useState<Match>({
    matchId: matchId,
  });
  const [, setError] = useState();

  const getMatch = useCallback(async () => {
    const data = await getOpenDotaMatchInfo(matchId);
    setMatchInfo(() => data);
  }, [matchId]);

  useEffect(() => {
    if (!_.isEmpty(heroes)) {
      getMatch().catch((err) =>
        setError(() => {
          throw err;
        })
      );
    }
  }, [heroes, getMatch]);

  return (
    <Card className='w-[506px]'>
      <Suspense fallback={<Loading />}>{matchInfo.matchId}</Suspense>
    </Card>
  );
};

MatchInfo.displayName = 'MatchInfo';

export default MatchInfo;
