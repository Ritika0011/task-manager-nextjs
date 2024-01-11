"use client"
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { login } from "@/services/userService";
import UserContext from '@/context/userContext';


const Login = () => {
  const router = useRouter();
  const context=useContext(UserContext);

  const [loginData, setLoginData ] = useState({
    email:"",
    password: "",
  })

  const loginFormSubmitted=async (event)=>{
    event.preventDefault();
    console.log(loginData);

    if(loginData.email.trim() === "" || loginData.password.trim() === ""  ) {
      toast.info("Invalid data !!", {
        position:"top-center"
      });
      return;
    }

    // valiid data
    // login

    try {
      const result = await login(loginData);
      console.log(result);
      toast.success("Logged In");
      //redirect
      context.setUser(result.user);

      router.push("/profile/user")
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }

  }
  return (
    <div className='grid grid-cols-12'>
        <div className=' col-span-4 col-start-5'>
            <div className='py-5'></div>
            <h1 className='text-3xl text-center'>Login Here</h1>

            <form action="#!" onSubmit={loginFormSubmitted}>
                    {/* email */}

                    <div className='mt-3'>
                        <label htmlFor="user_email" className='block text-sm font-medium mb-2 ps-3'>Email</label>
                        <input type="email" className='border border-gray-300 rounded-lg w-full p-3 bg-gray-400 focus:ring-gray-400-100' placeholder='Enter here' id='user_email' name='user_email' onChange={(event) => {
                          setLoginData({
                            ...loginData,
                            email: event.target.value,
                        })
                    }} value = {loginData.email}/>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="user_password" className='block text-sm font-medium mb-2 ps-3'>Password</label>
                        <input type="password" className='border border-gray-300 rounded-lg w-full p-3 bg-gray-400 focus:ring-gray-400-100' placeholder='Enter here' id='user_password'
                        name='user_password' onChange={(event) => {
                            setLoginData({
                                ...loginData,
                                password:event.target.value,
                            });

                        }} value = {loginData.password} />
                    </div>

                    <div className='mt-3 text-center'>
                        <button type='submit' className='px-3 py-2 bg-green-600 rounded-lg hover:bg-green-300'>Login</button>
                        <button className='px-3 py-2 bg-green-600 rounded-lg hover:bg-green-300 ms-3' type='button'>Reset</button>
                    </div>
                    {/* {
                      JSON.stringify(loginData)
                    } */}
            </form>

        </div>
    </div>        
  )
}

export default Login
