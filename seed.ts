import { faker } from "@faker-js/faker";
import { db } from "./Database";
import { customer, product, subscription } from "./Database/schema";

// List of SaaS product names (you can expand this list with more options)
const saasProductNames = [
  "Salesforce", "HubSpot", "Slack", "Asana", "Trello", 
  "Zoom", "Dropbox", "Google Workspace", 
  "Shopify", "DocuSign", "Stripe", "Intercom", "Mailchimp", 
  "QuickBooks", "FreshBooks", "G Suite", "Calendly", "Airtable"
];

// Ensure unique product names by converting to Set
const uniqueSaasProductNames = Array.from(new Set(saasProductNames));

async function seedDatabase() {
  // Insert 100 customers
  const customers = Array.from({ length: 100 }).map(() => ({
    customerId: faker.string.alphanumeric(10),
    name: faker.person.fullName(),
    pan: `${faker.string.alpha({ length: 5 }).toUpperCase()}${faker.number.int({ min: 1000, max: 9999 })}${faker.string.alpha({ length: 1 }).toUpperCase()}`,
  }));
  await db.insert(customer).values(customers);

  // Insert 10 products with unique SaaS product names
  const products = Array.from({ length: 10 }).map(() => ({
    productName: faker.helpers.arrayElement(uniqueSaasProductNames), // Randomly select from unique SaaS list
    description: faker.commerce.productDescription(),
    annualCostPerUser: faker.number.float({ min: 100, max: 1000, fractionDigits: 2 }),
  }));
  await db.insert(product).values(products);

  // Insert 100 subscriptions
  const subscriptions = Array.from({ length: 100 }).map(() => ({
    customerId: faker.helpers.arrayElement(customers).customerId,
    productName: faker.helpers.arrayElement(products).productName,
    subscriptionStartDate: faker.date.past().toISOString(),
    subscriptionEndDate: faker.date.future().toISOString(),
    numberOfUsers: faker.number.int({ min: 1, max: 50 }),
  }));
  await db.insert(subscription).values(subscriptions);

  console.log("Database seeding completed!");
}

seedDatabase().catch((err) => {
  console.error("Error seeding database:", err);
});
