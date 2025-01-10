import { db } from '@/Database';
import { subscription } from '@/Database/schema';
import { sql } from 'drizzle-orm';
import React from 'react'
import { BiSolidPurchaseTag } from "react-icons/bi";
const TotalSubs = async() => {
  const result = await db
    .select({
      count : sql<number>`COUNT(*)`
    })
    .from(subscription)
    .where(sql`DATE_PART('year',"subscriptionStartDate") = DATE_PART('year',CURRENT_DATE)`)
    const currentYearSubs = result[0].count || 0
    const currentYear = new Date().getFullYear()
  return (
    <div className='border border-gray-500 rounded-xl p-6'>
          <p className="font-bold text-gray-500">Subscription</p>
          <div className='flex justify-between items-center'>
          <p className='font-bold text-3xl'>{currentYearSubs}</p>
          <BiSolidPurchaseTag className='text-2xl text-yellow-500 ' />
          </div>
          <p className='text-gray-500'>Total Subscriptions in <span className='font-bold'>{currentYear}</span></p>
        </div>
  )
}

export default TotalSubs