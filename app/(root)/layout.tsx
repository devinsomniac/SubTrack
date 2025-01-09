import Signature from '@/components/Signature'
import React from 'react'
import { initializeApp } from '@/lib/initializeApp'

const layout = async({children}:Readonly<{children:React.ReactNode}>) => {
  await initializeApp()
  return (
    <div>
     {children}
     <Signature/>
    </div>

  )
}

export default layout
