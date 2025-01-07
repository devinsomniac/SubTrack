import Link from 'next/link'
import React from 'react'

const Signature = () => {
  return (
    <div className='p-3 flex justify-center items-center'>
    <p>Made with ❤️ by <Link href={"https://www.inzamam.tech/"}> Insomniac</Link></p>
    </div>
  )
}

export default Signature
