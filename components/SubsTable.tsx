import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { eq } from 'drizzle-orm'
import { db } from '@/Database'
import { customer, subscription } from '@/Database/schema'

const SubsTable = async () => {
    const subs = await db.select().from(subscription).innerJoin(customer, eq(subscription.customerId, customer.customerId));
    console.log(subs)
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Subscription Id</TableHead>
                        <TableHead>Customer Name</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Start date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>No Of Users</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subs.length > 0 ? (
                        subs.map((sub) => (
                            <TableRow key={sub.subscription.subscriptionId}>
                                <TableCell className="font-medium">{sub.subscription.subscriptionId}</TableCell>
                                <TableCell>{sub.customer.name}</TableCell>
                                <TableCell>{sub.subscription.productName}</TableCell>
                                <TableCell>{sub.subscription.subscriptionStartDate}</TableCell>
                                <TableCell>{sub.subscription.subscriptionEndDate}</TableCell>
                                <TableCell>{sub.subscription.numberOfUsers}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                No subscriptions found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default SubsTable