import React, { useContext } from 'react'
import UserContext from '../../context/UserContext'
import { useTranslation } from 'react-i18next'

export default function AlertModal({children , onClick}) {
   const {alertMessage , setAlertMessage ,alert , setAlert} = useContext(UserContext)
   const {t} = useTranslation()

  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={()=>setAlert(!alert)}>
      <div className='w-full md:w-1/2  bg-white flex flex-col items-center gap-2 p-4 rounded-lg'>
      <p className='text-xl font-bold'>{alertMessage}</p>
      <button
            className=" bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black py-2 px-8 rounded-3xl font-bold mt-4"
            onClick={()=>setAlert(!alert)}
          >{t("Okay")}</button>
      </div>
    </div>
  )
}
