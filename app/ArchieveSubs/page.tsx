import ArchieveSubsTable from '@/components/ArchieveSubsTable'
import Signature from '@/components/Signature'
import { db } from '@/Database'
import { archievesubscription, customer, SubscriptionWithCustomer } from '@/Database/schema'
import { eq } from 'drizzle-orm'
import React from 'react'

const page = async () => {
  const queryResult = await db
    .select()
    .from(archievesubscription)
    .innerJoin(customer, eq(archievesubscription.customerId, customer.customerId));

  const archieveSubs: SubscriptionWithCustomer[] = queryResult.map((row) => ({
    customer: row.customer,
    subscription: row.archievesubscription, 
  }));

  return (
    <div className="p-5"> 
      <div className="h-[100vh] md:h-[60vh] overflow-y-auto border rounded-md p-2">
        <ArchieveSubsTable archieveSubs={archieveSubs} />
      </div>
      <Signature/>
    </div>
  );
};

export default page;
