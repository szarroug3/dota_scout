'use client';

import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { RefreshCcw, Trash } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Loading from '@/app/loading';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import PlayerHeroesTableBody from './PlayerHeroesTableBody';
import {
  refreshPlayerProfileType,
  removePlayerProfileType,
} from './PlayerProfile';

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>;
  data: Array<TData>;
  pageSize: number;
  loading: boolean;
  refreshPlayer: refreshPlayerProfileType;
  removePlayer: removePlayerProfileType;
}

const PlayerHeroesTable = <TData, TValue>({
  columns,
  data,
  pageSize,
  loading,
  refreshPlayer,
  removePlayer,
}: DataTableProps<TData, TValue>) => {
  const defaultSort = [
    {
      id: 'count',
      desc: true,
    },
    {
      id: 'winRate',
      desc: true,
    },
  ];
  const [sorting, setSorting] = useState<SortingState>(defaultSort);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    enableMultiSort: true,
    enableSortingRemoval: true,
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className='space-y-2'>
      <div className='flex items-center'>
        <Input
          placeholder='Filter heroes...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
        />
      </div>
      <div className='rounded-md border'>
        <Table className='w-[470px] space-y-2'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {loading ? (
            <TableBody className='h-[449px]'>
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Loading amount={8} />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <PlayerHeroesTableBody
              data={table.getRowModel().rows}
              columnCount={columns.length}
            />
          )}
        </Table>
      </div>
      <div className='flex flex-row justify-between'>
        <div className='flex items-center space-x-2'>
          <Button
            className='items-center px-1'
            variant='ghost'
            onClick={() => refreshPlayer()}
          >
            <RefreshCcw className='h-4 w-4' />
          </Button>
          <Button
            className='items-center px-1'
            variant='ghost'
            onClick={() => removePlayer()}
          >
            <Trash className='h-4 w-4' />
          </Button>
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlayerHeroesTable;
