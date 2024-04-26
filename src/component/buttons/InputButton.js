import React, { useRef } from 'react'
import Loader from '../loader/Loader'
import { useTranslation } from 'react-i18next'

const InputButton = ({onChange, loading, text}) => {

    const inputRef = useRef(null)
    const {t} = useTranslation()
    const handleButton = ()=>{
        inputRef.current.click()
    }

  return (
    <>
    <input
      type="file"
      name='gaurdian'
      accept=".jpg, .jpeg, .png, .pdf" // Specify allowed file types
      ref={inputRef}
      style={{ display: "none" }} // Hide the input element
      onChange={onChange}
      />
      <button
      className="flex items-center bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black rounded-xl text-md px-4 hover:cursor-pointer p-2 font-semibold hover:scale-105 ease-in-out duration-300"
      onClick={handleButton}
      disabled={loading}
      >
        {(loading) ? <Loader/> : t(text)}
      </button>
          </>
  )
}

export default InputButton
