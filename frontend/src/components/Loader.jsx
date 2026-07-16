import React from 'react'
import { LuLoaderCircle } from "react-icons/lu";

const Loader = ({className}) => {
  return (
    <div className={`flex items-center gap-2 justify-center text-lg ${className}`}>
        <span>Loading...</span> 
        <LuLoaderCircle className='animate-spin size-5'/>
    </div>
  )
}

export default Loader;