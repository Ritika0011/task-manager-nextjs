"use client";
import React from 'react'

const footer = () => {
  return (
    <footer className='h-40 bg-orange-300 mt-5'>
        <div className='flex p-5 justify-around'>
            <div className='test-center flex flex-col justify-center'>
                <h1 className='text-3xl'>Welcome to Work Manager</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, quibusdam.</p>

            </div>
            <div className='text-center'>
                <h1>Important Links</h1>
                <ul>
                    <li><a href="#!" className='hover:text-blue-100'>Instagram</a></li>
                    <li><a href="#!" className='hover:text-blue-100'>Linkedin</a></li>
                    <li><a href="#!" className='hover:text-blue-100'>Gmail</a></li>
                </ul>

            </div>

        </div>
    </footer>
  )
}

export default footer
