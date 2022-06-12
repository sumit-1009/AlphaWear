import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'

const Myaccount = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [user, setUser] = useState({ value: null })
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [npassword, setNpassword] = useState('')
  const router = useRouter()
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    if (!myuser) {
      router.push('/')
    }
    if (myuser && myuser.token) {
      setUser(myuser)
      setEmail(myuser.email)
      fetchData(myuser.token)
    }
  }, [])

  const fetchData = async(token) =>{
    let data = { token: token }
    let a = await fetch(`http://localhost:3000/api/getuser`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let res = await a.json()
    setName(res.name)
    setAddress(res.address)
    setPincode(res.pincode)
    setPhone(res.phone)
  }

  const handleSubmit = async () => {
    let data = { token: user.token, address, name, phone, pincode }
    let a = await fetch(`http://localhost:3000/api/updateuser`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let res = await a.json()
    if(res.success){
    toast.success("Details Updated Successfully", {
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

  const handlePasswordSubmit = async () => {
    let res;
    if(npassword == cpassword){
    let data = { token: user.token, password, cpassword, npassword }
    let a = await fetch(`http://localhost:3000/api/updatepassword`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    res = await a.json()
  }
  else{
    res = {success: false}
  }
    if(res.success){
    toast.success("Password Updated Successfully", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    }
    else{
      toast.error("Error Updating Password", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    setPassword('')
    setNpassword('')
    setCpassword('')
  }
 

  const handleChange = async (e) => {

    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value)
    }
    else if (e.target.name == 'pincode') {
      setPincode(e.target.value)
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name == 'cpassword') {
      setCpassword(e.target.value)
    }
    else if (e.target.name == 'npassword') {
      setNpassword(e.target.value)
    }

  }
  return (
    <div className='container mx-auto my-9 min-h-screen'>
      <Head>
        <title>AlphaWear.com/MyAccount</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/></Head>
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
      <h1 className="text-3xl mb-5 text-center font-bold">Your Profile</h1>
      <h2 className='mx-10 font-semibold text-xl'>1.Your Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 md:w-1/2 w-full">
          <div className="mb-4">
            <label htmlFor="name" className="mx-10 leading-7 text-sm text-gray-600">Name</label>
            <input onChange={handleChange} value={name} type="text" id="name" name="name" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 md:w-1/2 w-full">
          <div className="mb-4">
            <label htmlFor="email" className="mx-10 leading-7 text-sm text-gray-600">Email</label>
            {user && user.token ? <input value={user.email} type="email" id="email" name="email" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly /> : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}
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
        <div className="px-2 md:w-1/2 w-full">
          <div className="mb-4">
            <label htmlFor="phone" className="mx-10 leading-7 text-sm text-gray-600">Phone Number</label>
            <input placeholder='Your 10 digit phone number' onChange={handleChange} value={phone} type="phone" id="phone" name="phone" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 md:w-1/2 w-full">
          <div className="mb-2">
            <label htmlFor="pincode" className="mx-10 leading-7 text-sm text-gray-600">Pincode</label>
            <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="container flex items-center justify-center">
        <button onClick={handleSubmit} className="flex mr-2 items-center justify-center text-white bg-indigo-500 border-0 py-2 px-10 mt-3 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
      </div>

      <h2 className='mx-10 font-semibold text-xl mt-10'>2.Change Password</h2>
      <div className="mx-auto my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="password" className="mx-10 leading-7 text-sm text-gray-600">Current Password</label>
            <input onChange={handleChange} value={password} type="password" id="password" name="password" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="npassword" className="mx-10 leading-7 text-sm text-gray-600">New Password</label>
            <input onChange={handleChange} value={npassword} type="password" id="npassword" name="npassword" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div> 
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="cpassword" className="mx-10 leading-7 text-sm text-gray-600">Confirm Password</label>
            <input onChange={handleChange} value={cpassword} type="password" id="cpassword" name="cpassword" className="mx-10 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="container flex items-center justify-center">
        <button onClick={handlePasswordSubmit} className="flex items-center justify-center text-white bg-indigo-500 border-0 py-2 px-10 mt-3 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
      </div>
    </div>
  )
}


export default Myaccount