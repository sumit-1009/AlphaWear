import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TiShoppingCart } from 'react-icons/ti'
import { MdAccountCircle } from 'react-icons/md'


const Navbar = ({user, logout}) => {
  const [dropdown, setDropdown] = useState(false)
  return (
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-xl  sticky top-0 text-white z-10 bg-blue-500'>
      <div className="logo mr-auto mx-5 md:mx-5">
        <Link href={'/'}><a><Image src="/logo3.jpg" alt="" width={200} height={40} /></a></Link>
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-6 font-bold md:text-md'>
          <Link href={'/tshirts'}><a><li className='hover:text-black'>Tshirts</li></a></Link>
          <Link href={'/hoodies'}><a><li className='hover:text-black'>Hoodies</li></a></Link>
          <Link href={'/trackpants'}><a><li className='hover:text-black'>Trackpants</li></a></Link>
          <Link href={'/shoes'}><a><li className='hover:text-black'>Shoes</li></a></Link>
          <div>
            <span onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}>
            {dropdown && <div onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="absolute right-8 bg-blue-400 top-11 rounded-md px-5 py-4 w-40">
              <ul>
                <Link href={'/myaccount'}><a><li className='py-1 hover:text-black cursor-pointer text-sm font-bold'>My Account</li></a></Link>
                <Link href={'/orders'}><a><li className='py-1 hover:text-black cursor-pointer text-sm font-bold'>My Orders</li></a></Link>
                <li onClick={logout} className='py-1 hover:text-black cursor-pointer text-sm font-bold'>Logout</li>
              </ul>
            </div>}
          {user.value && <MdAccountCircle className='text-xl md:text-3xl cart absolute right-10 top-5 md:top-4 mx-5 cursor-pointer' />}</span>
          {!user.value && <Link href={'/login'}><a><li className='hover:text-black'><div className="cart absolute right-11 top-4 mx-5 cursor-pointer">
            <button>Login</button>
          </div></li></a></Link>}
          </div>
          <Link href={'/cart'}><a><li className='hover:text-black'><div className="cart top-5 absolute right-0 md:top-4 mx-5 cursor-pointer">
          <TiShoppingCart className='text-xl md:text-3xl' /></div></li></a></Link>
        </ul>
      </div>
    </div>
  )
}

export default Navbar

//<MdAccountCircle className='text-xl md:text-3xl' />