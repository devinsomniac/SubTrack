import { db } from "@/Database";
import { product, productType } from "@/Database/schema";
import { NextResponse } from "next/server";

export const GET = async() => {
    let productArray : productType[]
    try{
        productArray = await db.select().from(product)
        return NextResponse.json(productArray) 
    }catch(err){
        console.log("There has been an error fetching product",err)
    }
}