import ActiveSubs from '@/components/ActiveSubs';
import ArchieveSubs from '@/components/ArchieveSubs';
import { chartSales } from '@/components/Charts';
import LatestSubs from '@/components/LatestSubs';
import Sales from '@/components/Sales';
import Signature from '@/components/Signature';
import TotalSubs from '@/components/TotalSubs';
import React from 'react';

const formatDate = (date: Date): string => {
  const day = date.getDate();

  const ordinalSuffix = (n: number): string => {
    if (n > 3 && n < 21) return 'th'; 
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);

  return `${day}${ordinalSuffix(day)} ${formattedDate}`;
};

const Page: React.FC = () => {
  const today = new Date();

  return (
    <div className="p-8">
      <div className='flex justify-between items-center'>
        <h2 className="font-bold text-3xl">Dashboard</h2>
        <h2 className='p-2 bg-black text-white rounded-lg'>{formatDate(today)}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
        <ActiveSubs />
        <ArchieveSubs />
        <TotalSubs/>
        <Sales/>
      </div>
      <div className='p-3 grid grid-cols-1  md:grid-cols-3 gap-2'>
        <div className='border border-black rounded-lg col-span-2'>
        <chartSales/>
        </div>
        <div className='col-span-1 border border-gray-700 rounded-lg'>
          <LatestSubs/>
        </div>
      </div>
      <Signature/>
    </div>
  );
};

export default Page
