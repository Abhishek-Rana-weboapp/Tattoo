import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { apiUrl } from '../../url';
import Loader from '../loader/Loader';
import LoaderModal from '../modal/LoaderModal';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import { IoMdClose } from 'react-icons/io';
import { AUTHHEADERS } from '../../commonFunctions/Headers';
import InputButton from '../buttons/InputButton';
import Modal from '../modal/Modal';

export default function VerifyUpload({step, setStep}) {
  const { t } = useTranslation();

  const [idPhoto, setIdPhoto] = useState(null);
  const [gaurdianIDPhoto, setGaurdianIDPhoto] = useState(null)
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [imagePrev , setImagePrev] = useState()
  const [gaurdianImagePrev , setGaurdianImagePrev] = useState()
  const [clientLoading, setClientLoading] = useState(false)
  const [gaurdianLoading, setGaurdianLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const minor = sessionStorage.getItem("minor")
  const {alert , setAlert , setAlertMessage } = React.useContext(UserContext);
 const typeofservice = JSON.parse(sessionStorage.getItem("appointment_detail")||"")?.typeofservice
 const [updateModal, setUpdateModal] = useState(false)

 
 useEffect(()=>{
   const fetchPrevIDs = async()=>{
     setLoading(true)
     await axios.get(`${apiUrl}Identity/latest_identity/`, {headers:AUTHHEADERS()})
     .then(res=>{
      if(minor === "false"){
        if(res.data.useridentity){
          setIdPhoto(res.data.useridentity.useridcard)
          setImagePrev(res.data.useridentity.useridcard)
          setStep(2)
          setUpdateModal(true)
          setLoading(false)
          return
        }else{
          setLoading(false)
          return
        }
      }
      if(minor === "true"){
        if(res.data.useridentity && res.data.guardianidentity){
          setIdPhoto(res.data.useridentity.useridcard)
          setImagePrev(res.data.useridentity.useridcard)
             setGaurdianIDPhoto(res.data.guardianidentity.guardianidcard)
             setGaurdianImagePrev(res.data.guardianidentity.guardianidcard)
             setUpdateModal(true)
             setLoading(false)
             setStep(2)
        }else{
          setLoading(false)
          return
        }
      }
      })
      .catch(err=>{
        setLoading(false)
        return
      })
    }
    
    fetchPrevIDs()
  },[])

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if(file){
      uploadFunction(file, "client");
    }
  };

  const handleGaurdianPhotoUpload =(e) => {
    const file = e.target.files[0];
    if(file){
      uploadFunction(file, "gaurdian");
    }
  };


  const uploadFunction = async(file, field)=>{
    if(field === "client"){
      setClientLoading(true)
    }

    if(field === "gaurdian"){
      setGaurdianLoading(true)
    }
        const formData = new FormData()
        formData.append("profile", file)
        await axios.post(`${apiUrl}upload`,formData, {headers : AUTHHEADERS()} )
        .then(res=>{
          if(res.data.profile_url){
            const url =  URL.createObjectURL(file)
            if(field === "client"){
              setIdPhoto(res.data.profile_url);
              setImagePrev(url)
              setClientLoading(false)
            }

            if(field === "gaurdian"){
                setGaurdianIDPhoto(res.data.profile_url);
                setGaurdianImagePrev(url)
                setGaurdianLoading(false)
            }
          }
        })
        .catch(err=>{
          setAlertMessage(t("Something went wrong"))
          setAlert(!alert)
        })
  }

     const handleVerifyID = async()=>{
      setLoading(true)
      let data
      if(minor === "false"){
        if(!idPhoto){
          setAlertMessage(t("Please upload an ID"))
          setAlert(!alert)
          setLoading(false)
          return
        }else{
          data = {
            UserIDCard:idPhoto
          }
          await axios.post(`${apiUrl}identity/user_identity` ,data,{headers:AUTHHEADERS()}).then((res)=>{
              setLoading(false)
              setStep(4)
              return
          }).catch((err)=>{
            setLoading(false)
            return
          })
        }
      }
      if(minor==="true"){
        if(idPhoto!==null && gaurdianIDPhoto!==null){
          let data = {
            UserIDCard: idPhoto
          };
          let gaurdiandata = {
            GuardianIDCard: gaurdianIDPhoto
          };
      
          Promise.all([
              axios.post(`${apiUrl}identity/user_identity`, data, {headers: AUTHHEADERS()}),
              axios.post(`${apiUrl}identity/guardian_identity`, gaurdiandata, {headers: AUTHHEADERS()}),
          ]).then((responses) => {
              setLoading(false);
              if(typeofservice === "tattoo" || typeofservice === "piercing"){
                setStep(3);
                return
              }else{
                setStep(4);
                return
              }
          }).catch((errors) => {
              setLoading(false);
              setAlertMessage(t("Something went wrong")); 
              setAlert(!alert);  
              return 
          });
      } else {
          setAlertMessage(t("Please upload both ID's"));
          setLoading(false);
          setAlert(!alert);
          return
      }
      }
    }


    const handleClientDelete = ()=>{
         setImagePrev(null);
    }

    const handleGaurdianDelete = ()=>{
         setGaurdianImagePrev(null)
    }

    

    const handlePrev = ()=>{
      setStep(1)
    }

    if(loading){
      return <LoaderModal/>
    }

    const handleNo = ()=>{
       setUpdateModal(false)
       if(minor === "true"){
         setStep(3)
       }else{
        setStep(4)
       }
    }

    const handleYes = ()=>{
       setUpdateModal(false)
    }

  return (
    <>
    {updateModal && (
        <Modal>
          <p className="text-3xl font-bold mb-4 text-black">
            {t("Do you want to update your ID?")}
          </p>
          <div className="flex  gap-5 items-center">
          <button
            className="yellowButton text-black py-2 px-8 rounded-3xl font-bold mt-4"
            onClick={handleYes}
          >
            {t("Yes")}
          </button>
          <button
            className="yellowButton text-black py-2 px-8 rounded-3xl font-bold mt-4"
            onClick={handleNo}
          >
            {t("No")}
          </button>
           
          </div>
        </Modal>
      )}
    <div className="w-full h-full flex flex-col justify-between items-center overflow-auto bg-black p-8 text-white">
      <div className='w-full h-full flex flex-col gap-3 items-center overflow-auto bg-black p-8 text-white'>

    <h1 style={{ fontSize: '24px', marginBottom: '20px' }}> {t("ID Verification")}</h1>

      {imagePrev && (
        <div className='relative md:w-1/4 w-full'>
        <img
          src={imagePrev}
          className='w-full'
          alt="ID Photo"
          />
        <IoMdClose className='absolute right-2 top-2 hover:cursor-pointer' onClick={handleClientDelete}/>
        </div>)
      }

      <InputButton onChange={handlePhotoUpload} loading={clientLoading} text={"Upload ID Photo"}/>



      {isSubmitDisabled ? <p className='text-center'>{t("Please upload client ID photo before submitting.")}</p> : null}
  
   {minor === "true" &&
   <>
     {gaurdianImagePrev && (
       <div className='relative md:w-1/4 w-full'>
       <img
       src={gaurdianImagePrev}
       className='w-full'
       alt="ID Photo"
       />
       <IoMdClose className='absolute right-2 top-2 hover:cursor-pointer' onClick={handleGaurdianDelete }/>
       </div>
       )
      }
      <InputButton onChange={handleGaurdianPhotoUpload} loading={gaurdianLoading} text={"Upload ID Photo"}/>
      {isSubmitDisabled ? <p className='text-center'>{t("Please upload Gaurdian's ID photo before submitting.")}</p> : null}
      </>
    }
  </div>

<div className='w-full md:w-1/2 flex justify-between'>
<button
      onClick={handlePrev}
      className="yellowButton px-4 py-2 font-bold rounded-3xl text-black"
      >
      {t("Back")}
      </button>

      <button
      onClick={handleVerifyID}
      disabled={minor === "false" ? !idPhoto  : !idPhoto && !gaurdianIDPhoto}
      className="yellowButton px-4 py-2 font-bold rounded-3xl text-black"
      >
      {t("Submit")}
      </button>
    
        </div>
    </div>
        </>
  )
}