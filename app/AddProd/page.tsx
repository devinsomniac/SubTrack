import { Input } from '@/components/ui/input'
import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <div className='p-14'>
        <h2 className='font-semibold text-2xl text-center'>Add New Product</h2>
      <form action="" className='flex flex-col justify-center  '>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='mt-4'>
            <label>Product Name</label>
            <Input placeholder='G Suite'/>
        </div>
        <div className='mt-4'>
            <label>Annual Cost</label>
            <Input type='number' placeholder='$200'/>
        </div>
        </div>
        <div className='mt-4'>
            <label>Product Description</label>
            <Textarea 
            placeholder='Google Workspace (formerly G Suite) is a cloud-based productivity and collaboration suite that includes tools like Gmail, Google Drive, Docs, Sheets, and Meet for businesses and individuals.'/>
        </div>
        <div className='flex justify-end'><Button className='mt-4'>Add Product</Button></div>
        
      </form>
    </div>
  )
}

export default page
