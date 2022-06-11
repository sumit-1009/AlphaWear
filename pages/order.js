import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Order from '../models/Order'
import mongoose from 'mongoose'

const MyOrder = ({order, clearCart}) => {
const products = order.products;
const router = useRouter()
const [date, setDate] = useState()
useEffect(() =>{
  const d = new Date(order.createdAt)
    setDate(d)
  if(router.query.clearCart == 1){
    clearCart() 
  }
}, [])

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto min-h-screen">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest font-bold">Alphawear</h2>
            <p className="leading-relaxed mb-4">Your Order have been successfully placed.</p>
            <p className="leading-relaxed mb-4">Order Placed on: {date && date.toLocaleString('hi-IN')}</p>
            <h2 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4">Order Id: #{order.orderId}</h2>
            <p className="leading-relaxed mb-4">Your Payment Status is: <span className='font-semibold'>{Order.status}</span> </p>
            <div className="flex mb-4 my-7">
              <a className="flex-grow text-center text-indigo-500 text-lg px-1">Item</a>
              <a className="flex-grow text-center text-lg px-1">Color</a>
              <a className="flex-grow text-center text-lg px-1">Size</a>
              <a className="flex-grow text-center text-lg px-1">Quantity</a>
              <a className="flex-grow text-center text-lg px-1">Price</a>
            </div>


            {Object.keys(products).map((key) =>{  
            return <div key={key} className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">{products[key].name}</span>
              <span className="flex-grow text-right text-gray-900">{products[key].color}</span>
              <span className="flex-grow text-right text-gray-900">{products[key].size}</span>
              <span className="flex-grow text-right text-gray-900">{products[key].qty}</span>
              <span className="flex-grow text-right text-gray-900">₹{products[key].price} X {products[key].qty} = ₹{products[key].price * products[key].qty}</span>
            </div>
          })}

            <div className="flex flex-col my-8">
              <span className="title-font font-medium text-2xl text-gray-900">Total Amount: ₹{order.subTotal}</span>
              <div className="my-4">
              <button className="flex mx-0 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track Order</button>
            </div>
            </div>
          </div>
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
        </div>
      </div>
    </section>

  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let order = await Order.findById(context.query.id)

  return {
    props: { order: JSON.parse(JSON.stringify(order))},
  }
}

export default MyOrder