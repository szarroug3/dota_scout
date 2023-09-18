import _ from 'lodash';

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading({ amount = 1 }) {
  return (
    <>
      {_.times(amount, (i) => (
        <div key={`loading-${i}`} className='flex items-center space-x-4'>
          <Skeleton className='h-12 w-12 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>
      ))}
    </>
  );
}
