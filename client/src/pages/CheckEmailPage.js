import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import { FaRegUserCircle } from "react-icons/fa";
import backgroundImg from '../assets/background.jpeg';


const CheckEmailPage = () => {

  const [data,setData] = useState({
     email : "",
    
  })

  const navigate = useNavigate()

  const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
          ...preve,
          [name] : value
      }
    })
  }



  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`

    try {
        const response = await axios.post(URL,data)
       

        toast.success(response.data.message)

        if(response.data.success){
            setData({
             
              email : "",
            
            })

            navigate('/password',{
              state:response?.data?.data
            })

        }
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
   
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: `url(${backgroundImg})` }}>
  <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 mx-auto -mt-14">
    <div className="flex justify-center mb-4">
      <FaRegUserCircle size={50} className="text-gray-600" />
    </div>
    <h3 className="text-center text-2xl font-semibold text-gray-700">Welcome to Chat App!</h3>
    <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-gray-600">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="bg-gray-100 border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={data.email}
          onChange={handleOnChange}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white text-lg font-bold py-2 rounded hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      >
        Let's go
      </button>
    </form>
    <p className="mt-4 text-center text-gray-600">
      New User? <Link to="/register" className="text-primary hover:underline">Register</Link>
    </p>
    <p className='text-red-500 text-sm text-center'>Register with dummy email</p>
  </div>
</div>

  )
}

export default CheckEmailPage
