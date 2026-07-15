import React from 'react'
import { LuLoaderCircle } from "react-icons/lu";

const Loader = () => {
  return (
    <div className='text-xl flex items-center gap-2 justify-center'>
        <span>Loading...</span> 
        <LuLoaderCircle className='animate-spin size-5'/>
    </div>
  )
}

export default Loader