"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

import { customerType } from "@/Database/schema"

interface CustomerContextType{
    customers : customerType[]
    setCustomers : React.Dispatch<React.SetStateAction<customerType[]>>
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined)

export const CustomerProvider = ({children} : {children : React.ReactNode})=>{
    const [customers,setCustomers] = useState<customerType[]>([])
    useEffect(() => {
        const fetchCustomer = async() => {
            try{
                const response = await fetch("/api/fetchCustomer")
                if(!response.ok){
                    throw new Error("Failed to fetch")
                }
                const data: customerType[] = await response.json();
                setCustomers(data)
            }catch(err){
                console.log("There has been an error",err)
            }
        }
        fetchCustomer()
    },[])

    return(
        <CustomerContext.Provider value={{customers,setCustomers}}>
            {children}
        </CustomerContext.Provider>
    )

}

export const useCustomerContext = () => {
    const context = useContext(CustomerContext)
    if (!context) {
      throw new Error("useCustomerContext must be used within a CustomerProvider");
    }
    return context;
  };
