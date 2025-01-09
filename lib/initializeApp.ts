import { db } from "@/Database"
import { archievesubscription, subscription } from "@/Database/schema"
import { eq, lte } from "drizzle-orm"

let initialized = false

export async function initializeApp() {
    if(initialized) return

    initialized = true
    try{
        const today = new Date().toISOString().split("T")[0]

        const expiredSubs = await db
        .select()
        .from(subscription)
        .where(lte(subscription.subscriptionEndDate,today))

        for(const sub of expiredSubs){
            await db.insert(archievesubscription).values({
                ...sub,
            })
        await db
            .delete(subscription)
            .where(eq(subscription.subscriptionId,sub.subscriptionId))      
        }
        console.log("Expired subscriptions moved successfully.");
        
    }catch(err){
        console.error("Error during app initialization:", err);
    }
}