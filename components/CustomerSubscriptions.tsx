import React from 'react';

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
  return (
    <div className='p-5 grid grid-cols-1 md:grid-cols-2 gap-3'>
      {customerSubscription.map((sub, index) => (
        <div key={index} className="p-4 mb-4 bg-gray-100 rounded shadow">
          <h3 className="font-bold text-xl">{sub.subscription.productName}</h3>
          <p>Subscription Start: {sub.subscription.subscriptionStartDate}</p>
          <p>Subscription End: {sub.subscription.subscriptionEndDate}</p>
          <p>Number of Users: {sub.subscription.numberOfUsers}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerSubscriptions;
