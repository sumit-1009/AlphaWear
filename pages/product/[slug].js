import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import mongoose from "mongoose";
import Product from "../../models/Product"
import Error from 'next/error'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'

const Post = ({ buyNow, addToCart, product, variants, error }) => {
  const router = useRouter()
  const { slug } = router.query
  const [pin, setPin] = useState()
  const [service, setService] = useState()

  const [color, setColor] = useState()
  const [size, setSize] = useState()
  useEffect(() => {
    if(!error){
   setColor(product.color)
   setSize(product.size)
    }
  }, [router.query])
  

  const checkServiceability = async () => {
    let pins = await fetch(`http://localhost:3000/api/pincode`)
    let pinJson = await pins.json()
    if (Object.keys(pinJson).includes(pin)) {
      setService(true)
      toast.success('Your Pincode is serviceable!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      setService(false)
      toast.error('Sorry! Pincode is not serviceable!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const onChangePin = (e) => {
    setPin(e.target.value)
  }

  const refreshVariant = (newsize, newcolor) => {
    let url = `http://localhost:3000/product/${variants[newcolor][newsize]['slug']}`
    router.push(url)
  }

  if(error == 404){
    return <Error statusCode={404} />
  }

  return <>
    <section className="text-gray-600 body-font overflow-hidden">
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container px-5 py-16 mx-auto min-h-screen">
      <Head>
        <title>AlphaWear.com/Product</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/></Head>
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-center rounded" src={product.img} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-xl title-font text-gray-500 tracking-widest font-bold">{product.comp}</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">Men {product.category}({product.size}/{product.color})</h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">{product.desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(variants).includes('White') && Object.keys(variants['White']).includes(size) && <button onClick={() => { refreshVariant(size, 'White') }} className={`border-2 bg-white rounded-full w-6 h-6 focus:outline-none ${color === 'White' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Red') && Object.keys(variants['Red']).includes(size) && <button onClick={() => { refreshVariant(size, 'Red') }} className={`border-2 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${color === 'Red' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Blue') && Object.keys(variants['Blue']).includes(size) && <button onClick={() => { refreshVariant(size, 'Blue') }} className={`border-2 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ${color === 'Blue' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Navy-Blue') && Object.keys(variants['Navy-Blue']).includes(size) && <button onClick={() => { refreshVariant(size, 'Navy-Blue') }} className={`border-2 ml-1 bg-blue-900 rounded-full w-6 h-6 focus:outline-none ${color === 'Navy-Blue' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Orange') && Object.keys(variants['Orange']).includes(size) && <button onClick={() => { refreshVariant(size, 'Orange') }} className={`border-2 ml-1 bg-orange-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Orange' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Yellow') && Object.keys(variants['Yellow']).includes(size) && <button onClick={() => { refreshVariant(size, 'Yellow') }} className={`border-2 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Yellow' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Green') && Object.keys(variants['Green']).includes(size) && <button onClick={() => { refreshVariant(size, 'Green') }} className={`border-2 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none ${color === 'Green' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Violet') && Object.keys(variants['Violet']).includes(size) && <button onClick={() => { refreshVariant(size, 'Violet') }} className={`border-2 border-gray-300 ml-1 bg-violet-700 rounded-full w-6 h-6 focus:outline-none ${color === 'Violet' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Grey') && Object.keys(variants['Grey']).includes(size) && <button onClick={() => { refreshVariant(size, 'Grey') }} className={`border-2 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none ${color === 'Grey' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Black') && Object.keys(variants['Black']).includes(size) && <button onClick={() => { refreshVariant(size, 'Black') }} className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color === 'Black' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Brown') && Object.keys(variants['Brown']).includes(size) && <button onClick={() => { refreshVariant(size, 'Brown') }} className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color === 'Brown' ? 'border-black' : 'border-gray-300'}`}></button>}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select value={size} onChange={(e) => { refreshVariant(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                    ({color && Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>} || {color && Object.keys(variants[color]).includes('UK8') && <option value={'UK8'}>UK8</option>})
                    ({color && Object.keys(variants[color]).includes('M') && <option value={'M'}>M</option>} || {color && Object.keys(variants[color]).includes('UK9') && <option value={'UK9'}>UK9</option>})
                    ({color && Object.keys(variants[color]).includes('L') && <option value={'L'}>L</option>} || {color && Object.keys(variants[color]).includes('UK10') && <option value={'UK10'}>UK10</option>})
                    ({color && Object.keys(variants[color]).includes('XL') && <option value={'XL'}>XL</option>} || {color && Object.keys(variants[color]).includes('UK11') && <option value={'UK11'}>UK11</option>})
                    ({color && Object.keys(variants[color]).includes('XXL') && <option value={'XXL'}>XXL</option>} || {color && Object.keys(variants[color]).includes('UK12') && <option value={'UK12'}>UK12</option>})

                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              {product.availableQty>0 && <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>}
              {product.availableQty<=0 && <span className="title-font font-medium text-2xl text-gray-900">Item Out Of Stock!</span>}
              <button disabled={product.availableQty <= 0} onClick={() => { buyNow(slug, 1, product.price, product.comp, product.size, product.color) }} className="flex ml-10 text-white bg-indigo-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded disabled:bg-blue-300">Buy Now</button>
              <button disabled={product.availableQty <=0} onClick={() => {
                toast.success('Item added to cart!', {
                  position: "top-center",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }); addToCart(slug, 1, product.price, product.comp, product.size, product.color)
              }} className="flex ml-4 text-white bg-indigo-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded disabled:bg-blue-300">Add to Cart</button>
            </div>
            <div className="pin mt-6 flex space-x-2 text-sm">
              <input onChange={onChangePin} className='px-2 border-2 border-gray-400 rounded-md' placeholder='Enter Your Pincode' type="text" />
              <button onClick={checkServiceability} className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'>Check Serviceability</button>
            </div>
            {(!service && service != null) && <div className='text-red-700 text-sm font-bold mt-3'>
              Sorry! We do not deliver to this pincode yet
            </div>}
            {(service && service != null) && <div className='text-green-700 text-sm font-bold mt-3'>
              Yay! This pincode is serviceable
            </div>}
          </div>
        </div>
      </div>
    </section>
  </>
}

export async function getServerSideProps(context) {
  let error=null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let product = await Product.findOne({ slug: context.query.slug })
  if(product == null){
    return{
    props: { error: 404 }
  }
}
  let variants = await Product.find({ brand: product.brand, category: product.category})
  let colorSizeSlug = {}
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
    else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
  }

  return {
    props: {error: error, product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) },
  }
}

export default Post