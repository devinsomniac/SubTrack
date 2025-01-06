'use client';

import React, { FormEvent, useState } from 'react';
import GenerateId from '@/components/GenerateId';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { LuLoaderPinwheel } from "react-icons/lu";
import { useCustomerContext } from '@/Context/CustomerContext';
const AddCustomerForm = () => {
  const [loading, setLoading] = useState(false)
  const {setCustomers} = useCustomerContext()
  const createNewCustomer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/createNewCustomer', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast.success("New Customer has been added to database!");
        const updatedResponse = await fetch('/api/fetchCustomer')
        const updatedCustomer = await updatedResponse.json()
        setCustomers(updatedCustomer)
        if (form) {
          form.reset();
        }
      } else {
        throw new Error("Failed to add customer.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding customer.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <form className="flex flex-col gap-3" onSubmit={createNewCustomer}>
      <div className="flex flex-col">
        <label>Name</label>
        <Input name="name" required />
      </div>
      <GenerateId />
      <div className="flex flex-col">
        <label>PAN</label>
        <Input name="pan" required />
      </div>
      <div>
      <Button type="submit" disabled={loading}>{loading ?<LuLoaderPinwheel className='animate-spin'/> : "Add Customer" }</Button>
      </div>
      
    </form>
  );
};

export default AddCustomerForm;
