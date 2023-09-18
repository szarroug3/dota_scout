'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { getOpenDotaMatchInfo } from '@/data/match';
import { ColumnDef } from '@tanstack/react-table';
import _ from 'lodash';
import { ArrowUpDown } from 'lucide-react';

import { Heroes } from '@/types/hero';
import { Match } from '@/types/match';
import Loading from '@/app/loading';

import { Button } from '../ui/button';
import { Card } from '../ui/card';

const columns: ColumnDef<Match>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Hero
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const value: string = row.getValue('name');
      return <div className='w-36'>{value}</div>;
    },
  },
  {
    accessorKey: 'count',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='w-34'
      >
        Games
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const value: number = row.getValue('count');
      return <div className='shrink text-center'>{value}</div>;
    },
  },
  {
    accessorKey: 'winRate',
    header: ({ column }) => (
      <Button
        className='w-32'
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Win Rate
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const value: number = row.getValue('winRate');
      const formatted = new Intl.NumberFormat('default', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
      return <div className='w-32 text-center'>{formatted}</div>;
    },
  },
];

const MatchInfo = ({
  matchId,
  heroes,
}: {
  matchId: number;
  heroes: Heroes;
}) => {
  const [loadingMatchInfo, setLoadingMatchInfo] = useState(true);
  const [, setError] = useState();

  const getMatch = useCallback(async () => {
    getOpenDotaMatchInfo(matchId, heroes)
      .then((data) => {
        setLoadingMatchInfo(false);
      })
      .catch((err) => {
        setError(() => {
          throw err;
        });
      })
      .finally(() => {});
  }, [matchId, heroes]);

  useEffect(() => {
    if (!_.isEmpty(heroes)) {
      getMatch();
    }
  }, [heroes, getMatch]);

  return (
    <Card className='w-[506px]'>
      <Suspense fallback={<Loading />}>{matchId}</Suspense>
    </Card>
  );
};

export default MatchInfo;

MatchInfo.displayName = 'MatchInfo';
