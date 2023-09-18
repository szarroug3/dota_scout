import { Column, ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, SortAsc, SortDesc } from 'lucide-react';

import { PlayerHero } from '@/types/hero';

import { Button } from '../ui/button';
import { CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import PlayerHeroesTable from './PlayerHeroesTable';

const renderSortIcon = (sorted: boolean | string) => {
  switch (sorted) {
    case 'asc':
      return <SortAsc className='mx-0 ml-2 h-4 w-4 px-0' />;
    case 'desc':
      return <SortDesc className='mx-0 ml-2 h-4 w-4 px-0' />;
    default:
      return <ArrowUpDown className='ml-2 h-4 w-4' />;
  }
};

const sortColumn = (column: Column<PlayerHero, unknown>) => {
  switch (column.getNextSortingOrder()) {
    case 'asc':
      return column.toggleSorting(false, true);
    case 'desc':
      return column.toggleSorting(true, true);
    default:
      return column.clearSorting();
  }
};

const columns: ColumnDef<PlayerHero>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => sortColumn(column)}>
        Hero
        {renderSortIcon(column.getIsSorted())}
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
        onClick={() => sortColumn(column)}
        className='w-34'
      >
        Games
        {renderSortIcon(column.getIsSorted())}
      </Button>
    ),
    cell: ({ row }) => {
      const value: number = row.getValue('count');
      return <div className='shrink text-center'>{value}</div>;
    },
    sortDescFirst: true,
  },
  {
    accessorKey: 'winRate',
    header: ({ column }) => (
      <Button
        className='w-32'
        variant='ghost'
        onClick={() => sortColumn(column)}
      >
        Win Rate
        {renderSortIcon(column.getIsSorted())}
      </Button>
    ),
    cell: ({ row }) => {
      const value: number = row.getValue('winRate');
      const formatted = new Intl.NumberFormat('default', {
        style: 'percent',
      }).format(value);
      return <div className='w-32 text-center'>{formatted}</div>;
    },
    sortDescFirst: true,
  },
];

const PlayerTable = ({
  recentlyPlayed,
  loadingRecent,
  mostPlayed,
  loadingMost,
  refreshPlayer,
  removePlayer,
}: {
  recentlyPlayed: PlayerHero[];
  loadingRecent: boolean;
  mostPlayed: PlayerHero[];
  loadingMost: boolean;
  refreshPlayer: Function;
  removePlayer: Function;
}) => {
  return (
    <CardContent className='p-4'>
      <Tabs defaultValue='recent'>
        <TabsList>
          <TabsTrigger value='recent' className='p-2'>
            Recent Heroes
          </TabsTrigger>
          <TabsTrigger value='heroes' className='p-2'>
            Most Played Heroes
          </TabsTrigger>
        </TabsList>
        <TabsContent value='recent'>
          <PlayerHeroesTable
            columns={columns}
            data={recentlyPlayed}
            pageSize={10}
            loading={loadingRecent}
            refreshPlayer={refreshPlayer}
            removePlayer={removePlayer}
          />
        </TabsContent>
        <TabsContent value='heroes'>
          <PlayerHeroesTable
            columns={columns}
            data={mostPlayed}
            pageSize={10}
            loading={loadingMost}
            refreshPlayer={refreshPlayer}
            removePlayer={removePlayer}
          />
        </TabsContent>
      </Tabs>
    </CardContent>
  );
};

export default PlayerTable;
