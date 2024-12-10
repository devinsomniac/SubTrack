import SelectCustomer from '@/components/SelectCustomer'
import SelectProduct from '@/components/SelectProduct'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { GenerateIds } from '@/lib/GenerateId'
import React from 'react'

const page = () => {

  return (
    <>
      <section className='p-10'>
        <h2 className='text-2xl font-semibold text-center'>Add New Subscription</h2>
        <form className='flex gap-3 justify-center items-center p-3'>
          <div className='flex flex-col items-center'>
            <label>Customer</label>
            <SelectCustomer />
          </div>
          <div className='flex flex-col items-center'>
            <label>Product</label>
            <SelectProduct />
          </div>
          <div className='flex flex-col items-center'>
            <label>Start Date</label>
            <Input type='date' className='w-[150px]' />
          </div>
          <div className='flex flex-col items-center' >
            <label>End Date</label>
            <Input type='date' className='w-[150px]' />
          </div>
          <Button className='mt-6'>Start</Button>
        </form>
      </section>
      <Separator className='w-full my-5' />
      <section className='p-10 '>
        <h2 className='text-2xl font-semibold text-center'>Add New Customer</h2>
        <form className='flex flex-col gap-3'>
          <div className='flex flex-col'>
            <label>Name</label>
            <Input />
          </div>
          <div>
            <label>Customer Id</label>
            <Input className='mb-2' readOnly value={}/>
            <Button onClick={GenerateIds}>Generate</Button>
          </div>
          <div>
            <label>PAN</label>
            <Input />
          </div>
          <Button>Add Customer</Button>
        </form>
      </section>


    </>
  )
}

export default page