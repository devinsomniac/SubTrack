"use client"
import React, { useEffect, useState } from 'react'
import { SubscriptionWithCustomer } from "@/Database/schema";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const SubsTable = ({search} : {search : string}) => {
    const [subs,setSubs] =  useState<SubscriptionWithCustomer[]>([]);
    const [loading,setLoading] = useState(true)
    useEffect(() => {

        const fetchData = async() => {
            try{
                const response = await fetch(`/api/fetchData?search=${search || ""}`);
                if(response.ok){
                    const data = await response.json()
                    console.log(data)
                    setSubs(data)
                }
                else{
                    console.error("Failed to fetch data");
                }
            }catch(err){
                console.log("There has been error in SusTable Code",err)
            }
            finally {
                setLoading(false);
            }
        }
        fetchData()
    },[search])
    return (
        <div className=' border rounded-md'>
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