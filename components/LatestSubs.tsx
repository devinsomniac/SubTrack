import { db } from '@/Database';
import { customer, subscription } from '@/Database/schema';
import { desc, eq, sql } from 'drizzle-orm';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';

const LatestSubs = async () => {
    const result = await db
        .select()
        .from(subscription)
        .innerJoin(customer, eq(subscription.customerId, customer.customerId))
        .orderBy(desc(sql`${subscription.subscriptionStartDate}`))
        .limit(5)
        .execute();

    return (
        <div className='p-4'>
            <h2 className='font-bold text-lg p-2 border border-gray-300 rounded-lg'>Recent Subscriptions</h2>
            <div>
                {result.map((sub, index) => (
                    <div key={index} className='p-2 border-b border-gray-300 flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>P</AvatarFallback>
                        </Avatar>
                       <Link href={`/Users/${sub.customer.customerId}`}>
                        <div>
                            <p className='font-semibold hover:underline'>{sub.customer.name}</p>
                            <p>{sub.customer.customerId}</p>
                        </div>
                        </Link>
                        </div>
                        <div className='text-right font-semibold'>
                            <p>{sub.subscription.productName}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestSubs;
