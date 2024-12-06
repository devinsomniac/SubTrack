'use client'
import React, { ChangeEvent, useState } from "react"
import SubsTable from "@/components/SubsTable"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
const Page = () => {
    const [search,setSearch] = useState("")
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    return (
        <>
            <div className="p-5">
                <h2 className="font-semibold text-2xl">Subscriptions</h2>
                <form action="" className="w-[500px] border p-4 rounded-xl my-2 flex flex-col gap-2">
                    <label>Search</label>
                    <Input value={search} onChange={handleChange} />
                </form>
                <div className="h-[100vh] md:h-[60vh] overflow-y-auto border rounded-md p-2">
                    <SubsTable search={search} />
                </div>

            </div>

        </>


    )
}

export default Page
