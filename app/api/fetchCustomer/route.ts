import { db } from "@/Database";
import { customer } from "@/Database/schema";
import { customerType } from "@/Database/schema";
import { NextResponse } from "next/server";
export const GET = async() => {
    let customerArray : customerType[] = []
   try{
    customerArray = await db.select().from(customer)
    return NextResponse.json(customerArray)
   }catch(err){
    console.log("There has an error in Fetching Customer",err)
   }
}