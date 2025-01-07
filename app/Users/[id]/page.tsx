import { db } from '@/Database'
import { customer } from '@/Database/schema'
import { eq } from 'drizzle-orm'
import React from 'react'
const page = async({params} : {params : { id: string}}) => {
  const customerId = (await params).id
  console.log(customerId)
  if(!customerId){
    throw new Error("No customer found")
  }
  const customerResponse = await db.select().from(customer).where(eq(customer.customerId,customerId))
  const customerDetails = customerResponse[0]
  
  
  return (
    <div className='p-8'>
      <div className='w-[30vw] p-3 bg-slate-100 rounded-lg shadow-lg hover:bg-yellow-100'>
        <p className='font-bold text-3xl'>{customerDetails.name}</p>
        <p>Customer id : {customerDetails.customerId}</p> 
        <p>Customer Pan : {customerDetails.pan}</p> 
      </div>
      
    </div>
  )
}

export default page
