"use client";
import React, { useContext } from 'react'
import UserContext from '@/context/userContext';
import { logout } from '@/services/userService';
import Link from "next/link";
import { useRouter } from 'next/navigation';

// import UserContext from "@/context/userContext";
// import { logout } from "@/services/userService";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useContext } from "react";
// import { toast } from "react-toastify";

const CustomNavbar = () => {

  const context = useContext(UserContext);
  const router = useRouter();

  async function doLogout() {
    try {

      const result = await logout();
      console.log(result);
      context.setUser(undefined);
      router.push('/');

    }catch(error) {
      console.log(error);
      toast.error("Logout error");

    }
  } 
  console.log(context);
  return (
    <nav className=' bg-orange-300 h-14 py-2 px-36 flex justify-between items-center'>
      <div className='brand'>
        <h1 className='text-2xl font-semibold'>
          <a href="#!">Work Manager</a>
        </h1>
      </div>
      <div>
        <ul className='flex space-x-6'>
          {context.user && (
          <>
    
          <li>
            <Link href={"/"} className='hover:text-blue-100'>Home</Link>
          </li>
          <li>
            <Link href={"/add-task"} className='hover:text-blue-100'>Add Task</Link>
          </li>
          <li>
            <Link href={"/show-tasks"} className='hover:text-blue-100'>Show Tasks</Link>
          </li>
          </>
          )}
        </ul>
      </div>
      <div>
        <ul className='flex space-x-4'>
          {context.user && (
          <>
          <li>
            <Link href={'#!'} className='hover:text-blue-100'>{context.user.name}</Link>
          </li>
          <li>
            <button onClick={doLogout} className='hover:text-blue-100'>Logout</button>
          </li>
          </>
          )}

          {!context.user && (
            <>
            <li>
              <Link href={'/login'} className='hover:text-blue-100'>Login</Link>
            </li>
            <li>
              <Link href={'/signup'} className='hover:text-blue-100'>Signup</Link>
            </li>
            </>

          )}
        </ul>
      </div>
    </nav>
  )
}

export default CustomNavbar;
