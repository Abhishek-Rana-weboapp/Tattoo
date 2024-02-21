import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { apiUrl } from '../../url';
import Loader from '../loader/Loader';
import LoaderModal from '../modal/LoaderModal';
import UserContext from '../../context/UserContext';
import axios from 'axios';

export default function VerifyUpload({step, setStep}) {
  const fileInputRef = useRef(null);
  const gaurdianfileInputRef = useRef(null)
  const { t } = useTranslation();

  const [idPhoto, setIdPhoto] = useState(null);
  const [gaurdianIDPhoto, setGaurdianIDPhoto] = useState(null)
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [imagePrev , setImagePrev] = useState()
  const [gaurdianImagePrev , setGaurdianImagePrev] = useState()
  const [clientLoading, setClientLoading] = useState(false)
  const [gaurdianLoading, setGaurdianLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const appointmentID = sessionStorage.getItem("appointmentID")
  const minor = sessionStorage.getItem("minor")
  const {alert , setAlert , setAlertMessage } = React.useContext(UserContext);


  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if(file){
      uploadClientIdPhoto(file);
    }
  };

  const handleGaurdianPhotoUpload =(e) => {
    const file = e.target.files[0];
    if(file){
      uploadGaurdianIdPhoto(file);
    }
  };


    const uploadClientIdPhoto = (file) => {
      setClientLoading(true)
        const formData = new FormData();
        formData.append('profile', file);
    
        fetch(`${apiUrl}/upload`, {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.profile_url) {
              const url =  URL.createObjectURL(file)
              setIdPhoto(data.profile_url);
              setImagePrev(url)
              setClientLoading(false) // Enable the submit button
            } else {
              console.error('Failed to upload ID photo.');
              setClientLoading(false)
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            setClientLoading(false)
          });
      };

      const uploadGaurdianIdPhoto = (file) => {
        setGaurdianLoading(true)
          const formData = new FormData();
          formData.append('profile', file);
      
          fetch(`${apiUrl}/upload`, {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.profile_url) {
                const url =  URL.createObjectURL(file)
                setGaurdianIDPhoto(data.profile_url);
                setGaurdianImagePrev(url)
                setGaurdianLoading(false) // Enable the submit button
              } else {
                console.error('Failed to upload ID photo.');
                setGaurdianLoading(false)
              }
            })
            .catch((error) => {
              console.error('Error:', error);
              setGaurdianLoading(false)
            });
        };

      const handleButton = ()=>{
        fileInputRef?.current?.click()
     }


     const handleGaurdianButton =()=>{
      gaurdianfileInputRef?.current?.click()
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
            updates : [{
              id: appointmentID,
              updateField : "id_url",
              updateValue : idPhoto
            }]
          }
        }
      }else{
        if(idPhoto && gaurdianIDPhoto){
          data = {
            updates : [
              {
              id: appointmentID,
              updateField : "id_url",
              updateValue : idPhoto
            },
            {
              id: appointmentID,
              updateField : "gaurdian_id",
              updateValue : gaurdianIDPhoto
            }
          ]
          }
        }else{
          setAlertMessage(t("Please upload both ID's"))
          setAlert(!alert)
          return
        }
      }if(data){
        await axios.post(`${apiUrl}/artist/post_new` ,data).then((res)=>{
          if(res.status === 201){
            setLoading(false)
            setStep(2)
            return
          }
        }).catch((err)=>{
          console.error(err.message)
          setLoading(false)
        })
      }
    }

    if(loading){
      return <LoaderModal/>
    }

  return (
    <div className="w-full h-full flex flex-col gap-3 items-center overflow-auto bg-black p-8 text-white">
    <h1 style={{ fontSize: '24px', marginBottom: '20px' }}> {t("ID Verification")}</h1>

      {imagePrev && (
        <img
          src={imagePrev}
          width={'50%'}
          style={{ maxWidth: '100%', maxHeight: '300px', margin: '20px auto', display: 'block' }}
          alt="ID Photo"
        />)
      }

      <input
        type="file"
        name="client"
        accept=".jpg, .jpeg, .png, .pdf" // Specify allowed file types
        ref={fileInputRef}
        style={{ display: "none" }} // Hide the input element
        onChange={handlePhotoUpload}
      />
      <button
        className="flex items-center bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black rounded-xl text-md px-4 hover:cursor-pointer p-2 font-semibold hover:scale-105 ease-in-out duration-300"
        onClick={handleButton}
        disabled={clientLoading}
      >
        {(clientLoading) ? <Loader/> : t("Upload ID Photo")}
      </button>


      {isSubmitDisabled ? <p className='text-center'>{t("Please upload client ID photo before submitting.")}</p> : null}
  
   {minor === "true" &&
   <>

     
     {gaurdianImagePrev && (
       <img
       src={gaurdianImagePrev}
       width={'50%'}
       style={{ maxWidth: '100%', maxHeight: '300px', margin: '20px auto', display: 'block' }}
       alt="ID Photo"
       />)
      }

      <input
      type="file"
      name='gaurdian'
      accept=".jpg, .jpeg, .png, .pdf" // Specify allowed file types
      ref={gaurdianfileInputRef}
      style={{ display: "none" }} // Hide the input element
      onChange={handleGaurdianPhotoUpload}
      />
      <button
      className="flex items-center bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black rounded-xl text-md px-4 hover:cursor-pointer p-2 font-semibold hover:scale-105 ease-in-out duration-300"
      onClick={handleGaurdianButton}
      disabled={gaurdianLoading}
      >
        {(gaurdianLoading) ? <Loader/> : t("Upload ID Photo")}
      </button>


      {isSubmitDisabled ? <p className='text-center'>{t("Please upload Gaurdian's ID photo before submitting.")}</p> : null}

      </>
    }

      <button
      onClick={handleVerifyID}
      disabled={minor === "false" ? !idPhoto  : !idPhoto && !gaurdianIDPhoto}
      className="flex items-center bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black rounded-xl text-md px-4 p-2 hover:cursor-pointer font-semibold hover:scale-105 ease-in-out duration-300"
      >
      {t("Submit")}
      </button>
    
    </div>
  )
}
