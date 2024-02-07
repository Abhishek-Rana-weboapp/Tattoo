import React from 'react'
import Loader from '../loader/Loader'

const LoaderModal = () => {
  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
    <div className='flex text-white justify-center gap-2 p-4 rounded-lg'>
      <Loader/>
    </div>    
    </div>
  )
}

export default LoaderModal
