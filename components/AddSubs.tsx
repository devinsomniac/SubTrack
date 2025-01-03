import React from 'react'
import SelectCustomer from './SelectCustomer'
import SelectProduct from './SelectProduct'
import { Input } from './ui/input'
import { Button } from './ui/button'
const AddSubs = () => {
  return (
    <div>
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
    </div>
  )
}

export default AddSubs