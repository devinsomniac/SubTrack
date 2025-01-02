import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/Database';
import { customer } from '@/Database/schema';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, customerId, pan } = body;

    if (!name || !customerId || !pan) {
      return NextResponse.json(
        { error: 'Name, Customer ID, and PAN are required.' },
        { status: 400 }
      );
    }

    const newCustomer = await db.insert(customer).values({
      name,
      customerId,
      pan,
    });

    return NextResponse.json(
      { message: 'Customer added successfully.', newCustomer },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error adding customer:', error);
    return NextResponse.json(
      { error: 'An error occurred while adding the customer.' },
      { status: 500 }
    );
  }
}
