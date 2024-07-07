import React from 'react'
import logo from '../assets/logo1.png'

const AuthLayouts = ({children}) => {
  return (
    <>
       <header className='flex justify-center items-center py-4 px-6 h-20 shadow-md bg-white'>
  <div className='flex items-center'>
    <img 
      src={logo}
      alt='logo'
      className='w-14 h-14 mr-2'
    />
    <span className='text-xl font-semibold text-gray-800'>ChatOne</span>
  </div>
  
</header>

        { children }
    </>
  )
}

export default AuthLayouts