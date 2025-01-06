"use client"
import { Input } from '@/components/ui/input'
import React, { ChangeEvent, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'

const page = () => {
  const [productName,setProductName] = useState<string>("")
  const [productDescription,setProductDescriprtion] = useState<string>("")
  const [productPrice,setProductPrice] = useState<number | undefined>()

  const handleProductName = (e:ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value)
  }

  const handleProductDescription = (e:ChangeEvent<HTMLTextAreaElement>) =>{
    setProductDescriprtion(e.target.value)
  }

  const handleProductPrice = (e:ChangeEvent<HTMLInputElement>) =>{
    const price = parseFloat(e.target.value) 
    setProductPrice(isNaN(price) ? undefined : price)
  }
  const handleProductSubmit = async(event : ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    formData.append('productName',productName)
    formData.append('productprice',productPrice ?.toString() ?? '')
    formData.append('productDescription',productDescription)

    const data = Object.fromEntries(formData.entries())
    try{
      const response = await fetch("/api/AddProd",{
        method : 'POST',
        headers : {
          'content-type' : 'application/json'
        },
        body : JSON.stringify(data)
      })
      if(!response){
        throw new Error("Error in adding nw product")
      }
      const result = await response.json()
      console.log('Submission successful:', result)
    }catch(err){
      console.log("Error in adding product",err)
    }
  }
  return (
    <div className='p-14'>
        <h2 className='font-semibold text-2xl text-center'>Add New Product</h2>
      <form className='flex flex-col justify-center' onSubmit={handleProductSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='mt-4'>
            <label>Product Name</label>
            <Input placeholder='G Suite' onChange={handleProductName}/>
        </div>
        <div className='mt-4'>
            <label>Annual Cost</label>
            <Input type='number' placeholder='$200' onChange={handleProductPrice}/>
        </div>
        </div>
        <div className='mt-4'>
            <label>Product Description</label>
            <Textarea onChange={handleProductDescription}
            placeholder='Google Workspace (formerly G Suite) is a cloud-based productivity and collaboration suite that includes tools like Gmail, Google Drive, Docs, Sheets, and Meet for businesses and individuals.'/>
        </div>
        <div className='flex justify-end'><Button className='mt-4'>Add Product</Button></div>
        
      </form>
    </div>
  )
}

export default page
