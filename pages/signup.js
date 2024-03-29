import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'

const Signup = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() =>{
        if(localStorage.getItem('myuser')){
          router.push('/')
        }
      })

    const handleChange = (e) =>{
        if(e.target.name == 'name'){
            setName(e.target.value)
        }
        else if(e.target.name == 'email'){
            setEmail(e.target.value)
        }
        else if(e.target.name == 'password'){
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { name: name, email, password }
        let res = await fetch(`http://localhost:3000/api/signup`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
        let response = await res.json()    
        setName('')
        setEmail('')
        setPassword('')
        toast.success('Your account has been successfully created!', {
            position: "top-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
    return (
        <div className="min-h-screen flex items-start justify-center pt-28 px-4 sm:px-6 lg:px-8">
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
            <div className="max-w-md w-full space-y-8">
            <Head>
        <title>AlphaWear.com/SignUp</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/></Head>
                <div>
                    <img className="mx-auto h-12 w-auto" src="/logo2.jpg" alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl font-bold text-blue-700">Sign Up for an account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or
                        <Link href={'/login'}><a href="#" className="font-medium text-2xl text-indigo-600 hover:text-indigo-500"> Login</a></Link>
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input value={name} onChange={handleChange} id="name" name="name" type="text" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter Your Name" />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input value={email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup