'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { FC, ReactNode } from 'react';
import { Calendar } from '../components/sections/Calendar';
import { Topbar } from '../components/sections/Topbar';
import { queryClient } from '../utils/queryClient';

interface TemplateProps {
  children: ReactNode;
}

const Template: FC<TemplateProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const dateSelected = new Date(Number(searchParams.get('date-selected') ?? Date.now()));
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Topbar />
        <Calendar view='month' dateSelected={dateSelected} />
        {children}
      </main>
    </QueryClientProvider>
  );
};

export default Template;
