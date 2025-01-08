"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { MdAutoDelete } from "react-icons/md";
import { db } from '@/Database';
import { subscription } from '@/Database/schema';
import { eq } from 'drizzle-orm';

type customer = {
  customerId: string;
  name: string;
  pan: string | null;
};

type subscription = {
  subscriptionId: number;
  customerId: string;
  productName: string;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  numberOfUsers: number;
};

type DataItem = {
  subscription: subscription;
  customer: customer;
};

type Props = {
  customerSubscription: DataItem[];
};

const CustomerSubscriptions: React.FC<Props> = ({ customerSubscription }) => {
  const [subscriptions, setSubscriptions] = useState(customerSubscription);
  const deleteSubscription = async (subscripId: number) => {
    try {
      const deleteResponse = await db.delete(subscription).where(eq(subscription.subscriptionId, subscripId));
      console.log(deleteResponse);
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.filter((sub) => sub.subscription.subscriptionId !== subscripId)
      );
    } catch (error) {
      console.error("Error deleting subscription:", error);
    }
  };

  return (
    <div className='p-5 grid grid-cols-1 md:grid-cols-2 gap-3'>
      {subscriptions.map((sub, index) => {
        const endDate = new Date(sub.subscription.subscriptionEndDate);
        const isExpired = endDate < new Date();

        return (
          <div key={index} className="p-4 mb-4 bg-gray-100 rounded shadow">
            <h3 className="font-bold text-xl">{sub.subscription.productName}</h3>
            <p>Subscription Start: {sub.subscription.subscriptionStartDate}</p>
            <p>Subscription End: {sub.subscription.subscriptionEndDate}</p>
            <p>Number of Users: {sub.subscription.numberOfUsers}</p>
            <Button
              disabled={isExpired}
              onClick={() => deleteSubscription(sub.subscription.subscriptionId)}
              className={`mt-3 ${isExpired ? 'cursor-not-allowed opacity-50' : ''}`}>
              End Subscription <MdAutoDelete />
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default CustomerSubscriptions;
