import Signature from '@/components/Signature'
import React from 'react'

const layout = ({children}:Readonly<{children:React.ReactNode}>) => {
  return (
    <div>
     {children}
     <Signature/>
    </div>

  )
}

export default layout
