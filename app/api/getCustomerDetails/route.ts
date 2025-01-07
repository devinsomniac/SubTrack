import { db } from "@/Database";
import { customer } from "@/Database/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Extract customerId from query parameters
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get("id");

  // Check if customerId exists
  if (!customerId) {
    return new NextResponse("Customer ID is required", { status: 400 });
  }

  // Validate the customerId format
  if (!/^[a-zA-Z0-9\-_.!~*()]+$/.test(customerId)) {
    return new NextResponse("Invalid customer ID format", { status: 400 });
  }

  try {
    // Fetch customer details from the database
    const response = await db
      .select()
      .from(customer)
      .where(eq(customer.customerId, customerId));

    // Check if a customer was found
    if (response.length === 0) {
      return new NextResponse("Customer not found", { status: 404 });
    }

    // Return successful response with customer details
    return NextResponse.json(
      { message: "Customer details fetched successfully", data: response },
      { status: 200 }
    );
  } catch (err) {
    // Log and return error message if something goes wrong
    console.error("Error in fetching customer details", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
