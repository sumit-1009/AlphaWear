import React from 'react'
import Link from 'next/link'
import mongoose from "mongoose";
import Product from "../models/Product"

const Trackpants = ({products}) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 md:py-20 py-10 mx-auto min-h-screen">
          <div className="flex flex-wrap -m-4 justify-center">
          {Object.keys(products).length === 0 && <p className='font-bold text-xl'>Sorry all the Trackpants are currently out of stock. New Stock coming soon. Stay Tuned!</p> }
          {Object.keys(products).map((item)=>{
              return<Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`}><div className="lg:w-1/5 md:w-1/2 p-4 w-1/2 cursor-pointer shadow-lg">
              <a className="block relative rounded overflow-hidden">
                <img alt="ecommerce" className="m-auto h-[30vh] md:h-[36vh] block" src={products[item].img} />
              </a>
              <div className="mt-4 md:mx-10">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Men {products[item].category}</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].comp}</h2>
                <p className="mt-1">₹{products[item].price}</p>
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
   let products = await Product.find({category: 'trackpants'})
   let pants = {}
    for(let item of products){
      if(item.brand in pants){
        if(!pants[item.brand].color.includes(item.color) && item.availableQty > 0){
          pants[item.brand].color.push(item.color)
        }
        if(!pants[item.brand].size.includes(item.size) && item.availableQty > 0){
          pants[item.brand].size.push(item.size)
        }
      }
      else{
        pants[item.brand] = JSON.parse(JSON.stringify(item))
        if(item.availableQty > 0){
          pants[item.brand].color = [item.color]
          pants[item.brand].size = [item.size]
        }
      }
    }
   return {
    props: {products: JSON.parse(JSON.stringify(pants))}, 
  }
}

export default Trackpants