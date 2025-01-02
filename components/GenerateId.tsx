'use client'
import React, { useRef } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
const GenerateId = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const generateIdForNewCustomer = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let id = ''
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            id += characters[randomIndex];
        }
        if (inputRef.current) {
            inputRef.current.value = id;
          }
    }
    return (
        <div>
            <label>Customer Id</label>
            <Input className='mb-2' name='customerId' readOnly ref={inputRef} />
            <Button onClick={generateIdForNewCustomer}>Generate</Button>
        </div>
    )
}

export default GenerateId
