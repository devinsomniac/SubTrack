import { db } from "@/Database";
import { customer } from "@/Database/schema";
import { customerType } from "@/Database/schema";
import { NextResponse } from "next/server";
import { like } from "drizzle-orm";
export const GET = async(req:Request) => {
    let customerArray : customerType[] = []
    try{
        const {searchParams} = new URL(req.url)
        const search = searchParams.get("search")
        if(search && typeof search === "string"){
            customerArray = await db
                .select()
                .from(customer)
                .where(like(customer.name,`%${search}%`))
        }else{
            customerArray = await db
                .select()
                .from(customer)
        }
        return NextResponse.json(customerArray)
    }catch(err){
        console.log("There has been error in fetching customer",err)

    }
}