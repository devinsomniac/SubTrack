import { integer, pgTable, varchar, real, date } from "drizzle-orm/pg-core";


export const customer = pgTable("customer", {
  customerId: varchar({ length: 50 }).notNull().primaryKey(), 
  name: varchar({ length: 255 }).notNull(), 
  pan: varchar({ length: 10 }), 
}); 


export const product = pgTable("product", {
  productName: varchar({ length: 100 }).notNull().primaryKey(), 
  description: varchar({ length: 500 }).notNull(), 
  annualCostPerUser: real().notNull(), 
});


export const subscription = pgTable("subscription", {
  subscriptionId: integer().primaryKey().generatedAlwaysAsIdentity(), 
  customerId: varchar({ length: 50 }).notNull().references(() => customer.customerId), 
  productName: varchar({ length: 100 }).notNull().references(() => product.productName), 
  subscriptionStartDate: date().notNull(), 
  subscriptionEndDate: date().notNull(), 
  numberOfUsers: integer().notNull(), 
});

export const archievesubscription = pgTable("archievesubscription", {
  subscriptionId: integer().primaryKey(), 
  customerId: varchar({ length: 50 }).notNull().references(() => customer.customerId), 
  productName: varchar({ length: 100 }).notNull().references(() => product.productName), 
  subscriptionStartDate: date().notNull(), 
  subscriptionEndDate: date().notNull(), 
});

export type SubscriptionWithCustomer = {
  subscription: {
      subscriptionId: number;
      productName: string;
      subscriptionStartDate: string;
      subscriptionEndDate: string;
      numberOfUsers: number;
  };
  customer: {
      name: string;
      customerId : string;
  };
};

export type customerType = {
    customerId : string,
    name : string,
    pan : string | null
}


export type productType = {
  productName : string,
  description : string,
  annualCostPerUser : number
}