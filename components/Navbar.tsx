import React from 'react'
import Image from 'next/image'
const Navbar = () => {
    return (
        <div>
            <div>
                <Image src={'/logo.png'} alt='logo' height={50} width={50}/>
            </div>
        </div>
    )
}

export default Navbar
