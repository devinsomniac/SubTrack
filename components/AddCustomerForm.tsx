'use client';

import React, { FormEvent } from 'react';
import GenerateId from '@/components/GenerateId';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AddCustomerForm = () => {
  const createNewCustomer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch('/api/createNewCustomer', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('Customer added successfully!');
    } else {
      alert('Failed to add customer.');
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
      <Button type="submit">Add Customer</Button>
    </form>
  );
};

export default AddCustomerForm;
