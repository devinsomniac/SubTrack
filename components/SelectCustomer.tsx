import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { customer } from '@/Database/schema'
import { db } from '@/Database'

const SelectCustomer = async() => {
    const customerArray = await db.select().from(customer)
    return (
        <div>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Customer" />
                </SelectTrigger>
                <SelectContent>
                    {customerArray.map((customer) => (
                        <SelectItem key={customer.customerId} value={customer.name}>{customer.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

        </div>
    )
}

export default SelectCustomer