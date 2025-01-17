"use client"
import React, { ChangeEvent, useState } from 'react'
import SelectCustomer from './SelectCustomer'
import SelectProduct from './SelectProduct'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { LuLoaderPinwheel } from "react-icons/lu";
import { toast } from "sonner";

const AddSubs = () => {
  const [selectedCustomer,setSelectedCustomer] = useState<string>("")
  const [selectedProduct,setSelectedProduct] = useState<string>("")
  const [startDate,setStartDate] = useState<string>("")
  const [endDate,setEndDate] = useState<string>("")
  const [loading,setLoading] = useState<boolean>(false)
  const handleCustomerSelection = (value : string) => {
    setSelectedCustomer(value)
    console.log(value)
  }
  const handleProductSelection = (value : string) =>{
    setSelectedProduct(value)
    console.log(value)
  }
  const handleStartDate = (e:React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value)
    console.log(e.target.value)
  }

  const handleEndDate = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value)
    console.log(e.target.value)
  }

  const handleFormSubmit = async(e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const formData = new FormData(e.currentTarget)//{"key":"value","key":"value"}
    formData.append('customer',selectedCustomer)
    formData.append('product',selectedProduct)
    formData.append('startDate',startDate)
    formData.append('endDate',endDate)

    const data = Object.fromEntries(formData.entries())//[["Key","Value"],["key":"value"]] -> {key:"value",key:"value"}
    try{
      const response = await fetch("/api/AddNewSubs", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if(response.ok){
        toast.success("Subscription added successfully!");
        if(form){
          form.reset()
        }
        setSelectedCustomer(""); // Reset customer selection
        setSelectedProduct(""); // Reset product selection
        setStartDate(""); // Reset start date
        setEndDate(""); // Reset end date
      }else{
        throw new Error('Failed to submit subscription data')
      }
    }catch(err){
      console.log("There has been an error in subscription",err)
      toast.error("Error in Adding Subsxription")
    }finally {
      setLoading(false);
    }
  }
  return (
    <div >
      <form className='flex flex-col md:flex-row w-full  gap-3 justify-center items-center p-3' onSubmit={handleFormSubmit}>
          <div className='flex flex-col items-center'>
            <label>Customer</label>
            <SelectCustomer onSelectCustomer = {handleCustomerSelection} selectedCustomer={selectedCustomer}/>
          </div>
          <div className='flex flex-col items-center'>
            <label>Product</label>
            <SelectProduct onSelectProduct={handleProductSelection} selectedProduct={selectedProduct} />
          </div>
          <div className='flex flex-col items-center'>
            <label>Start Date</label>
            <Input type='date' min={new Date().toISOString().split('T')[0]} className='w-[150px]' onChange={handleStartDate} />
          </div>
          <div className='flex flex-col items-center' >
            <label>End Date</label>
            <Input type='date' className='w-[150px]' onChange={handleEndDate}/>
          </div>
          <Button className='mt-6' disabled={loading}>{loading ? <LuLoaderPinwheel className='animate-spin' /> : "Start"}</Button>
        </form>
    </div>
  )
}

export default AddSubs