import { db } from '@/Database';
import { archievesubscription } from '@/Database/schema';
import { sql } from 'drizzle-orm';
import React from 'react'
import { LuTrendingDown } from "react-icons/lu";


const ArchieveSubs = async() => {
    const result = await db
    .select({
      count: sql<number>`COUNT(*)`,
    })
    .from(archievesubscription);

  const count = result[0].count;
  const currentmonthArchieve = await db
  .select({
    currentCount : sql<number>`COUNT(*)`
  })
  .from(archievesubscription)
  .where(
    sql`DATE_PART('month',"subscriptionStartDate") = DATE_PART('month',CURRENT_DATE)`
  )
  const currentMonthEndSubscriptions = currentmonthArchieve[0]?.currentCount || 0;
  console.log("Total subscriptions:", count);
  return (
    <div className='border border-gray-500 rounded-xl p-6'>
      <p className="font-bold text-gray-500">Archieved</p>
      <div className='flex justify-between items-center'>
      <p className='font-bold text-3xl'>-{count}</p>
      <LuTrendingDown className='text-2xl text-red-600' />
      </div>
      <p className='text-gray-500'>{currentMonthEndSubscriptions} total Ended Subscription</p>
    </div>
  )
}

export default ArchieveSubs
