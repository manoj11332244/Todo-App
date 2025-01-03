import { Button } from '@/components/ui/button'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout")
      console.log(res)
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/login")
      }
    } catch (error) {
      toast.error(error.response.data.message)
      // alert("Login is required")
      // console.log(res)
    }
  }

  return (
    <div className='bg-gray-600'>
      <div className='flex items-center justify-between p-2'>
        <h1 className='font-bold text-lg'>{"TODO APP"}</h1>
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </div>
  )
}

export default Navbar