'use client';

import Dashboard from '@/components/Dashboard';

export default function IndexPage() {
  return (
    <section className='grid w-full items-center gap-6 p-4'>
      <div className='flex w-full flex-col items-start gap-2'>
        <Dashboard />
      </div>
    </section>
  );
}
