import AddCustomerForm from '@/components/AddCustomerForm'
import AddSubs from '@/components/AddSubs'
import { Separator } from '@/components/ui/separator'
import { CustomerProvider } from '@/Context/CustomerContext'
import React from 'react'
import { Toaster } from '@/components/ui/sonner'
const page = () => {
  return (
    <>
    <CustomerProvider>
      <section className='p-10'>
        <h2 className='text-2xl font-semibold text-center'>Add New Subscription</h2>
        <AddSubs/>
      </section>
      
      <Separator className='w-full my-5' />
      <section className='p-10 '>
        <h2 className='text-2xl font-semibold text-center'>Add New Customer</h2>
        <AddCustomerForm />
      </section>
      <Toaster/>
      </CustomerProvider>
    </>
  )
}

export default page