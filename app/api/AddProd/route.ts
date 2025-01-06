import { db } from "@/Database";
import { product } from "@/Database/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        const body = await req.json()
        const {productName,productprice,productDescription} = body
        if(!productName || !productprice || !productDescription){
            return NextResponse.json({
                message : "Enter All the details"
            },{status:400})
        }

        const result = await db.insert(product).values({
            productName : productName,
            description:productDescription,
            annualCostPerUser:productprice
        })
        return NextResponse.json(
            {message : "Product Added Successfully",result},
            {status:201}
        )

    }catch(err){
        console.log("Error in adding product",err)
    }
}