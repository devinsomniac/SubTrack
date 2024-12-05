import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { product } from '@/Database/schema'
  import { db } from '@/Database'
const SelectProduct = async() => {
    const productArray = await db.select().from(product)
  return (
    <div>
      <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Product" />
  </SelectTrigger>
  <SelectContent>
    {productArray.map((product,index) => (
        <SelectItem key={index} value={product.productName}>{product.productName}</SelectItem>
    ))}
  </SelectContent>
</Select>

    </div>
  )
}

export default SelectProduct
