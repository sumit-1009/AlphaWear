import React from 'react'
import Link from 'next/link'
import mongoose from "mongoose";
import Product from "../models/Product"

const Shoes = ({products}) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
          {Object.keys(products).length === 0 && <p className='font-bold text-xl'>Sorry all the Shoes are currently out of stock. New Stock coming soon. Stay Tuned!</p> }
          {Object.keys(products).map((item)=>{
              return<Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`}><div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg">
              <a className="block relative rounded overflow-hidden">
                <img alt="ecommerce" className="m-auto h-[30vh] md:h-[36vh] block" src={products[item].img} />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Men {products[item].category}</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].comp}</h2>
                <p className="mt-1">₹{products[item].price}</p>
                <div className='mt-1'>
                  {products[item].size.includes('UK8') && <span className='border border-gray-300 px-1 mx-1'>UK8</span>}
                  {products[item].size.includes('UK9') && <span className='border border-gray-300 px-1 mx-1'>UK9</span>}
                  {products[item].size.includes('UK10') && <span className='border border-gray-300 px-1 mx-1'>UK10</span>}
                  {products[item].size.includes('UK11') && <span className='border border-gray-300 px-1 mx-1'>UK11</span>}
                  {products[item].size.includes('UK12') && <span className='border border-gray-300 px-1 mx-1'>UK12</span>}
                  </div>
                  <div className='mt-1'>
                  {products[item].color.includes('Yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-400 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('Blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('Red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('Navy-Blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-900 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('Black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('Orange') && <button className="border-2 border-gray-300 ml-1 bg-orange-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('White') && <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('Green') && <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('Gray') && <button className="border-2 border-gray-300 ml-1 bg-gray-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                  </div>
              </div>
            </div>
          </Link>})}
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
   }
   let products = await Product.find({category: 'shoes'})
   let shoe = {}
    for(let item of products){
      if(item.brand in shoe){
        if(!shoe[item.brand].color.includes(item.color) && item.availableQty > 0){
          shoe[item.brand].color.push(item.color)
        }
        if(!shoe[item.brand].size.includes(item.size) && item.availableQty > 0){
          shoe[item.brand].size.push(item.size)
        }
      }
      else{
        shoe[item.brand] = JSON.parse(JSON.stringify(item))
        if(item.availableQty > 0){
          shoe[item.brand].color = [item.color]
          shoe[item.brand].size = [item.size]
        }
      }
    }
   return {
    props: {products: JSON.parse(JSON.stringify(shoe))}, 
  }
}

export default Shoes