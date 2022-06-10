import React from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import Link from 'next/link'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { useState} from 'react'
import Head from 'next/head'
import Script from 'next/script'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = ({ cart, clearCart, subTotal, addToCart, removeFromCart }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [disabled, setDisabled] = useState(true)
  const handleChange = async(e) =>{
    
    if(e.target.name == 'name'){
      setName(e.target.value)
    } 
    else if(e.target.name == 'phone'){
      setPhone(e.target.value)
    }
    else if(e.target.name == 'email'){
      setEmail(e.target.value)
    }
    else if(e.target.name == 'address'){
      setAddress(e.target.value)
    }
    else if(e.target.name == 'pincode'){
      setPincode(e.target.value)
      if(e.target.value.length == 6){
        let pins = await fetch(`http://localhost:3000/api/pincode`)
        let pinJson = await pins.json()
        if(Object.keys(pinJson).includes(e.target.value)){
          setCity(pinJson[e.target.value][0])
          setState(pinJson[e.target.value][1])
        }
        else{
          setCity('')
          setState('')
        }
      }
      else{
        setCity('')
        setState('')
      }
    }
    if(name.length>3){
      setDisabled(false)
    }
    if(email.length>3){
      setDisabled(false)
    }
    if(phone.length>3){
      setDisabled(false)
    }
    if(address.length>3){
      setDisabled(false)
    }
    if(pincode.length>3){
      setDisabled(false)
    }
    else{
      setDisabled(true)
    }
    
  }

  const initiatePayment = async() => {
    let oid = Math.floor(Math.random() * Date.now());
    const data = { cart, subTotal, oid, email: email, name, address, pincode, phone };
    let a = await fetch(`http://localhost:3000/api/pretransaction`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      let txnRes = await a.json()
      if(txnRes.success){
      console.log(txnRes)
      let txnToken = txnRes.txnToken

    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
      "orderId": oid, 
      "token": txnToken, 
      "tokenType": "TXN_TOKEN",
      "amount": subTotal 
      },
      "handler": {
        "notifyMerchant": function(eventName,data){
          console.log("notifyMerchant handler function called");
          console.log("eventName => ",eventName);
          console.log("data => ",data);
        } 
      }
    };
    
            window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                window.Paytm.CheckoutJS.invoke();
            }).catch(function onError(error){
                console.log("error => ",error);
            });
          }
          else{
            console.log(txnRes.error)
            toast.error(txnRes.error, {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          }         
  }
  
  return (
    
    <div className='container m-auto  min-h-screen'>
      <ToastContainer
          position="top-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/></Head>
      <Script type="application/javascript" crossorigin="anonymous" src={`https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_MID}.js`} />
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='mx-10 font-semibold text-xl'>1. Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="mx-10 leading-7 text-sm text-gray-600">Name</label>
            <input onChange={handleChange} value={name} type="text" id="name" name="name" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="mx-10 leading-7 text-sm text-gray-600">Email</label>
            <input onChange={handleChange} value={email} type="email" id="email" name="email" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="mx-10 leading-7 text-sm text-gray-600">Address</label>
          <textarea onChange={handleChange} value={address} id="address" name="address" cols="30" rows="2" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
          </textarea>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="mx-10 leading-7 text-sm text-gray-600">Phone</label>
            <input onChange={handleChange} value={phone} type="phone" id="phone" name="phone" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="pincode" className="mx-10 leading-7 text-sm text-gray-600">Pincode</label>
            <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />  
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="mx-10 leading-7 text-sm text-gray-600">State</label>
            <input onChange={handleChange} value={state} type="text" id="state" name="state" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
          <label htmlFor="city" className="mx-10 leading-7 text-sm text-gray-600">City</label>
          <input onChange={handleChange} value={city} type="text" id="city" name="city" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>

      <h2 className='mx-10 font-semibold text-xl'>2. Review Cart Items & Pay</h2>
      <ol className='list-decimal font-semibold'>
        {Object.keys(cart).length == 0 && <div>
          <h2 className='flex justify-center items-center mt-5'>Hey, it feels so light!</h2>
          <h2 className='flex justify-center items-center mb-10'>There is nothing in your cart. Lets add some items.</h2>
        </div>
        }
        {Object.keys(cart).map((k) => {
          return <li key={k}>
            <div className='item flex my-5 mx-5'>
              <div className='font-semibold mx-12'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
              <div className='flex items-center justify-center w-1/3 font-semibold text-lg'><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-blue-500' /> <span className='mx-2'>{cart[k].qty}</span> <AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-blue-500' /></div>
            </div>
          </li>
        })}
      </ol>
      <span className='font-bold mx-20 my-5'>Total Amount: ₹{subTotal}</span>
      <div className="mx-20 my-2">
        <Link href={'/checkout'}><button disabled={disabled} onClick={initiatePayment} className="disabled:bg-blue-300 flex mr-2 items-center text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"> <BsFillBagCheckFill className='m-1' />Buy Now@ ₹{subTotal}</button></Link>
      </div>
    </div>
  )
}

export default Checkout

// import React from 'react'
// import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
// import Link from 'next/link'
// import { BsFillBagCheckFill } from 'react-icons/bs'
// import { useState} from 'react'

// const Checkout = ({ cart, clearCart, subTotal, addToCart, removeFromCart }) => {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [phone, setPhone] = useState('')
//   const [address, setAddress] = useState('')
//   const [pincode, setPincode] = useState('')
//   const [city, setCity] = useState('')
//   const [state, setState] = useState('')
//   const [disabled, setDisabled] = useState(true)
//   const handleChange = (e) =>{
//     if(e.target.name == 'name'){
//       setName(e.target.value)
//     }
//     else if(e.target.name == 'email'){
//       setEmail(e.target.value)
//     }
//     else if(e.target.name == 'phone'){
//       setPhone(e.target.value)
//     }
//     else if(e.target.name == 'address'){
//       setAddress(e.target.value)
//     }
//     else if(e.target.name == 'pincode'){
//       setPincode(e.target.value)
//     }
//     if(name.length>3){
//       setDisabled(false)
//     }
//     if(email.length>3){
//       setDisabled(false)
//     }
//     if(phone.length>3){
//       setDisabled(false)
//     }
//     if(address.length>3){
//       setDisabled(false)
//     }
//     if(pincode.length>3){
//       setDisabled(false)
//     }
//     else{
//       setDisabled(true)
//     }
    
//   }

//   const initializeRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
      
//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         resolve(false);
//       };

//       document.body.appendChild(script);
//     });
//   };

//   const makePayment = async () => {
//     const res = await initializeRazorpay();

//     if (!res) {
//       alert("Razorpay SDK Failed to load");
//       return;
//     }

//     const a = {cart, subTotal, email: email, name, address, pincode, phone}
//     const data = await fetch("/api/razorpay", { method: "POST" }).then((t) =>
//       t.json()
//     );
    
//     var options = {
//       key: process.env.RAZORPAY_KEY, 
//       name: "Alphawear Pvt Ltd",
//       currency: data.currency,
//       amount: data.amount,
//       order_id: data.id,
//       description: "Place Your Order Now",
//       "callbackUrl": "http://localhost:3000/api/posttransaction",
//       handler: function (response) {
        
//         alert(response.razorpay_payment_id);
//         alert(response.razorpay_order_id);
//         alert(response.razorpay_signature);
//       },
//       prefill: {
//         name: "Alphawear",
//         email: "alphawearawork@gmail.com",
//         contact: "9999999999",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };
  
//   return (
//     <div className='container m-auto'>
//       <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
//       <h2 className='mx-10 font-semibold text-xl'>1. Delivery Details</h2>
//       <div className="mx-auto flex my-2">
//         <div className="px-2 w-1/2">
//           <div className="mb-4">
//             <label htmlFor="name" className="mx-10 leading-7 text-sm text-gray-600">Name</label>
//             <input onChange={handleChange} value={name} type="text" id="name" name="name" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
//           </div>
//         </div>
//         <div className="px-2 w-1/2">
//           <div className="mb-4">
//             <label htmlFor="email" className="mx-10 leading-7 text-sm text-gray-600">Email</label>
//             <input onChange={handleChange} value={email} type="email" id="email" name="email" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
//           </div>
//         </div>
//       </div>
//       <div className="px-2 w-full">
//         <div className="mb-4">
//           <label htmlFor="address" className="mx-10 leading-7 text-sm text-gray-600">Address</label>
//           <textarea onChange={handleChange} value={address} id="address" name="address" cols="30" rows="2" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
//           </textarea>
//         </div>
//       </div>
//       <div className="mx-auto flex my-2">
//         <div className="px-2 w-1/2">
//           <div className="mb-4">
//             <label htmlFor="phone" className="mx-10 leading-7 text-sm text-gray-600">Phone</label>
//             <input onChange={handleChange} value={phone} type="phone" id="phone" name="phone" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
//           </div>
//         </div>
//         <div className="px-2 w-1/2">
//           <div className="mb-4">
//             <label htmlFor="pincode" className="mx-10 leading-7 text-sm text-gray-600">Pincode</label>
//             <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />  
//           </div>
//         </div>
//       </div>
//       <div className="mx-auto flex my-2">
//         <div className="px-2 w-1/2">
//           <div className="mb-4">
//             <label htmlFor="state" className="mx-10 leading-7 text-sm text-gray-600">State</label>
//             <input value={state} type="text" id="state" name="state" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
//           </div>
//         </div>
//         <div className="px-2 w-1/2">
//           <div className="mb-4">
//           <label htmlFor="city" className="mx-10 leading-7 text-sm text-gray-600">City</label>
//           <input value={city} type="text" id="city" name="city" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
//           </div>
//         </div>
//       </div>

//       <h2 className='mx-10 font-semibold text-xl'>2. Review Cart Items & Pay</h2>
//       <ol className='list-decimal font-semibold'>
//         {Object.keys(cart).length == 0 && <div>
//           <h2 className='flex justify-center items-center mt-5'>Hey, it feels so light!</h2>
//           <h2 className='flex justify-center items-center mb-10'>There is nothing in your cart. Lets add some items.</h2>
//         </div>
//         }
//         {Object.keys(cart).map((k) => {
//           return <li key={k}>
//             <div className='item flex my-5 mx-5'>
//               <div className='font-semibold mx-12'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
//               <div className='flex items-center justify-center w-1/3 font-semibold text-lg'><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-blue-500' /> <span className='mx-2'>{cart[k].qty}</span> <AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-blue-500' /></div>
//             </div>
//           </li>
//         })}
//       </ol>
//       <span className='font-bold mx-20 my-5'>Total Amount: ₹{subTotal}</span>
//       <div className="mx-20 my-2">
//         <Link href={'/checkout'}><button disabled={disabled} onClick={makePayment} className="disabled:bg-blue-300 flex mr-2 items-center text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"> <BsFillBagCheckFill className='m-1' />Buy Now@ ₹{subTotal}</button></Link>
//       </div>
//     </div>
//   )
// }

// export default Checkout

