"use client"
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { product, productType } from '@/Database/schema'
  import { db } from '@/Database'
const SelectProduct = () => {
  const [products,setProducts] = useState<productType[]>([])
  useEffect(() => {
    const fetchProduct = async() => {
      try {
        const response = await fetch('/api/fetchProduct');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data); 
      }catch(err){
        console.log("Error",err)
      }
    }
    fetchProduct()
  },[])
  return (
    <div>
      <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Product" />
  </SelectTrigger>
  <SelectContent>
    {products.map((product,index) => (
        <SelectItem key={index} value={product.productName}>{product.productName}</SelectItem>
    ))}
  </SelectContent>
</Select>

    </div>
  )
}

export default SelectProduct
