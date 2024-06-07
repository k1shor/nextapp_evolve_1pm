'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BiLogIn, BiLogOut, BiSolidDashboard, BiSolidUserDetail } from "react-icons/bi";
import { FaUserPlus, FaShoppingCart } from "react-icons/fa";
import { isAuthenticated } from '../api/userApi';
import { useRouter } from 'next/navigation';


const Header = () => {

  let [user, setUser] = useState({})
  let router = useRouter()

  useEffect(() => {
    isAuthenticated()
      .then(data => {
        setUser(data.user)
      })
  }, [])


  const handleLogout = () => {
    localStorage.removeItem('jwt')
    router.push('/login')
  }

  return (
    <>
      {/* <div className='container-fluid'> */}
      <div className="px-3 md:px-0 grid md:grid-cols-12 text-white bg-slate-800">
        <div className="md:col-span-3 text-center text-3xl py-2 font-bold hover:text-slate-200 ">
          <Link href='/'>Our Store</Link>
        </div>
        <div className="md:col-span-6 flex py-2">
          <input type="search" className='border border-3 border-orange-500 w-full rounded-s-md text-black px-3 outline-none ' />
          <button className='bg-orange-500 px-4 py-2 rounded-r-md hover:bg-orange-300 hover:text-orange-800 active:bg-orange-500 active:text-white'>Search</button>
        </div>
        <div className="md:col-span-3 flex justify-evenly py-3 text-3xl">
          {
            user ? <>
              {
                user.role == 1 ?
                  <Link href={'/admin/dashboard'}>
                    <BiSolidDashboard />
                  </Link>
                  :
                  <>
                  <Link href={'/profile'}>
                    <BiSolidUserDetail />
                  </Link>
                  <Link href={'/cart'}>
                  <FaShoppingCart />
                </Link>
                </>
              }

<button onClick={handleLogout}>
              <BiLogOut/>
</button>



            </> : <>
              <Link href={'/login'}>
                <BiLogIn />
              </Link>
              <Link href={'/register'}>
                <FaUserPlus />
              </Link>
            </>
          }

          
        </div>
      </div>
      {/* </div> */}
      <div className="flex justify-evenly bg-slate-500 py-2 text-white">
        <Link href={'/'}>Home</Link>
        <Link href={'/products'}>Products</Link>
        <Link href={'/services'}>Services</Link>
        <Link href={'/about'}>About</Link>
        <Link href={'/contact'}>Contact</Link>
      </div>
    </>
  )
}

export default Header