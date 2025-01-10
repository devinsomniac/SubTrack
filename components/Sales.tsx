import { db } from '@/Database';
import { subscription, product } from '@/Database/schema';
import { eq, sql, and, gt } from 'drizzle-orm';
import React from 'react';
import { FaDollarSign } from "react-icons/fa6";

const Sales = async () => {
  const currentDate = new Date();
  const lastYearDate = new Date();
  lastYearDate.setFullYear(currentDate.getFullYear() - 1);

  const result = await db
    .select({
      totalRevenue: sql<number>`SUM("subscription"."numberOfUsers" * "product"."annualCostPerUser")`,
    })
    .from(subscription)
    .leftJoin(
      product,
      eq(product.productName, subscription.productName)
    )
    .where(
      sql`"subscription"."subscriptionStartDate" >= ${lastYearDate.toISOString()}`
    )
    .execute();

  const totalRevenue = result[0]?.totalRevenue || 0;
  const profit = totalRevenue * 0.20;

  return (
    <div className='border border-gray-500 rounded-xl p-6'>
      <p className="font-bold text-gray-500">Revenue</p>
      <div className='flex justify-between items-center'>
        <p className='font-bold text-3xl text-green-600'>${profit.toFixed(2)}</p>
        <FaDollarSign className='text-2xl text-green-900 font-bold' />
      </div>
      <p className='text-gray-500'>Calculated from all product sales in the last 12 months.</p>
    </div>
  );
};

export default Sales;
