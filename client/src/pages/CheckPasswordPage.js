import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import backgroundImg from '../assets/background.jpeg';
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setToken} from '../redux/userSlice';

const CheckPasswordPage = () => {
  const [data,setData] = useState({
    password : "",
   
 })

 const navigate = useNavigate()
 const location=useLocation()
  const  dispatch=useDispatch()


useEffect(()=>{
  if(!location?.state?.name)
    navigate('/email')

},[location?.state?.name, navigate])


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

   const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`

   try {
       const response = await axios({
        method :'post',
        url:URL,
        data:{
        userId:location?.state?._id,
        password:data.password
       },
       withCredentials: true
       })
      

       toast.success(response.data.message)
       
       if(response.data.success){
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token',response?.data?.token)
           setData({
             password: "",
           })

           navigate('/')

       }
   } catch (error) {
       toast.error(error?.response?.data?.message)
   }
  
 }
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: `url(${backgroundImg})` }}>
  <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 mx-auto -mt-14">
    <div className="flex flex-col items-center mb-4">
      <Avatar width={50} height={50} name={location?.state?.name} imageUrl={location?.state?.profile_pic} />
      <h2 className="font-semibold text-lg mt-2 text-gray-700">{location?.state?.name}</h2>
    </div>
    <h3 className="text-center text-2xl font-semibold text-gray-700">Welcome to Chat App!</h3>
    <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="password" className="text-gray-600">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="bg-gray-100 border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={data.password}
          onChange={handleOnChange}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white text-lg font-bold py-2 rounded hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      >
        Login
      </button>
    </form>
    <p className="mt-4 text-center text-gray-600">
      <Link to="/forgot-password" className="text-primary hover:underline font-semibold">Forgot Password</Link>
    </p>
  </div>
</div>

  )
}

export default CheckPasswordPage
