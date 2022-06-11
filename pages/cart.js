import React from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import Link from 'next/link'
import { BsFillBagCheckFill } from 'react-icons/bs'

const Cart = ({cart, addToCart, removeFromCart, clearCart, subTotal}) => {
    return (
        <div className=' min-h-screen px-10'>
                <h2 className='font-bold text-xl text-center mt-10'>Shopping Cart</h2>
                <ol className='list-decimal font-semibold'>
                    {Object.keys(cart).length == 0 && <div>
                        <h2 className='flex justify-center items-center mt-5'>Hey, it feels so light!</h2>
                        <h2 className='flex justify-center items-center mb-10'>There is nothing in your cart.Lets add some items.</h2>
                    </div>
                    }
                    {Object.keys(cart).map((k)=>{return <li key={k}>
                        <div className='item flex my-5'>
                            <div className='w-2/3 font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                            <div className='flex items-center justify-center w-1/3 font-semibold text-lg'><AiFillMinusCircle onClick={()=>{removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}} className='cursor-pointer text-blue-500' /> <span className='mx-2'>{cart[k].qty}</span> <AiFillPlusCircle onClick={()=>{addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}}className='cursor-pointer text-blue-500' /></div>
                        </div>
                    </li>})}
                </ol>
                <div className="flex text-center justify-center mt-5">
                    <Link href={'/checkout'}><button disabled={Object.keys(cart).length === 0} className="disabled:bg-blue-300 flex mr-2 items-center text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"> <BsFillBagCheckFill className='m-1' />Checkout</button></Link>
                    <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className="disabled:bg-blue-300 flex mr-2 items-center text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg">Clear Cart</button>
                </div>
            </div>
    )
}

export default Cart