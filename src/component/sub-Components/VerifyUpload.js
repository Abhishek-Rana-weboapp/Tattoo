import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { apiUrl } from '../../url';

export default function VerifyUpload({handleSubmit}) {
  const fileInputRef = useRef(null);
  const { t } = useTranslation();

    const [idPhoto, setIdPhoto] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [imagePrev , setImagePrev] = useState()

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    uploadIdPhoto(file);
  };


    const uploadIdPhoto = (file) => {
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
              setIsSubmitDisabled(false); // Enable the submit button
            } else {
              console.error('Failed to upload ID photo.');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };

      const handleButton = ()=>{
        fileInputRef?.current?.click()
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
        accept=".jpg, .jpeg, .png, .pdf" // Specify allowed file types
        ref={fileInputRef}
        style={{ display: "none" }} // Hide the input element
        onChange={handlePhotoUpload}
      />
      <button
        className="flex items-center bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black rounded-xl text-md px-4 hover:cursor-pointer p-2 font-semibold hover:scale-105 ease-in-out duration-300"
        onClick={handleButton}
      >
        {t("Upload ID Photo")}
      </button>


      {isSubmitDisabled ? <p className='text-center'>{t("Please upload client ID photo before submitting.")}</p> : null}

      <button
        onClick={()=>handleSubmit(idPhoto)}
        disabled={isSubmitDisabled}
        className="flex items-center bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black rounded-xl text-md px-4 p-2 hover:cursor-pointer font-semibold hover:scale-105 ease-in-out duration-300"

      >
      {t("Submit")}
      </button>
    
    </div>
  )
}
