import { SubscriptionWithCustomer } from "@/Database/schema";
import { db } from "@/Database";
import { customer,subscription } from "@/Database/schema";
import { eq, like } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async(req: Request) => {
    try{
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search");
        let subs: SubscriptionWithCustomer[] = [];
        if(search && typeof search === "string"){
            subs = await db
                .select()
                .from(subscription)
                .innerJoin(customer,eq(subscription.customerId,customer.customerId))
                .where(like(customer.name,`%${search}%`))
        }else{
            subs = await db
                .select()
                .from(subscription)
                .innerJoin(customer,eq(subscription.customerId,customer.customerId))
        }
        return NextResponse.json(subs)
    }catch(err){
        console.log("There hs been an error",err)
    }
}

