import { db } from '@/Database';
import { subscription } from '@/Database/schema';
import { sql } from 'drizzle-orm';
import React from 'react';
import { LuTrendingUp } from "react-icons/lu";

const ActiveSubs = async () => {
  const totalResult = await db
    .select({
      count: sql<number>`COUNT(*)`,
    })
    .from(subscription);

  const totalSubscriptions = totalResult[0].count;

  
  const currentMonthResult = await db
    .select({
      count: sql<number>`COUNT(*)`,
    })
    .from(subscription)
    .where(
      sql`DATE_PART('month', "subscriptionStartDate") = DATE_PART('month', CURRENT_DATE)
          AND DATE_PART('year', "subscriptionStartDate") = DATE_PART('year', CURRENT_DATE)`
    );

  const currentMonthSubscriptions = currentMonthResult[0]?.count || 0;


  return (
    <div className="border border-gray-500 rounded-xl p-6">
      <p className="font-bold text-gray-500">Active Now</p>
      <div className='flex justify-between items-center'>
      <p className="font-bold text-3xl">+{totalSubscriptions}</p>
      <LuTrendingUp className='text-2xl text-green-500' />
      </div>
      <p className='text-gray-500'>{currentMonthSubscriptions} total this month</p>
    </div>
  );
};

export default ActiveSubs;
