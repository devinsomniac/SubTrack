import { db } from "@/Database";
import { subscription } from "@/Database/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req:NextRequest){
    try{
        const body = await req.json()
        const {customer,product,startDate,endDate} = body
        if(!customer || !product || !startDate || !endDate){
            return NextResponse.json({
                error : "Missing required Details"
            },{
                status:400
            })
        }

        const result = await db.insert(subscription).values({
            customerId : customer,
            productName : product,
            subscriptionStartDate : startDate,
            subscriptionEndDate : endDate,
            numberOfUsers : 100
        })

        return NextResponse.json(
            {message : "Subscription Addeed Succesfully",result},
            {status : 201}
        )
    }catch(err){
        console.log("There has been an error in subscription route",err)
    }
}