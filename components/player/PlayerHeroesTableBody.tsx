import { flexRender, Row } from '@tanstack/react-table';

import { TableBody, TableCell, TableRow } from '../ui/table';

const PlayerHeroesTableBody = <TData,>({
  data,
  columnCount,
}: {
  data: Array<Row<TData>>;
  columnCount: number;
}) => {
  return (
    <TableBody>
      {data.length ? (
        data.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className='p-3'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columnCount} className='h-24 text-center'>
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default PlayerHeroesTableBody;
