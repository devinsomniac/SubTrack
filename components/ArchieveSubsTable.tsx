'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SubscriptionWithCustomer } from '@/Database/schema';

const ArchieveSubsTable = ({ archieveSubs }: { archieveSubs: SubscriptionWithCustomer[] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubs = archieveSubs.filter((asub) => 
    asub.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asub.subscription.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Customer Name or Product Name"
          className="border p-2 w-full rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    <div>
      <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Subscription Id</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Start date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>No Of Users</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSubs.map((asub, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{asub.subscription.subscriptionId}</TableCell>
              <TableCell>{asub.customer.name}</TableCell>
              <TableCell>{asub.subscription.productName}</TableCell>
              <TableCell>{asub.subscription.subscriptionStartDate}</TableCell>
              <TableCell>{asub.subscription.subscriptionEndDate}</TableCell>
              <TableCell>{asub.subscription.numberOfUsers}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
    </>
  );
};

export default ArchieveSubsTable;
