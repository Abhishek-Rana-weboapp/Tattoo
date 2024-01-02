import React, { useContext, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import SignatureCanvas from 'react-signature-canvas'
import UserContext from '../../context/UserContext'

export default function SignatureModal({ handleSave , handleClear, showPopup, setShowPopup , setSignatureRef}) {

  const {t} = useTranslation()
  const {alert , setAlert} = useContext(UserContext)
  const signatureRef = useRef()

  setSignatureRef(signatureRef)

  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={()=>setShowPopup(!showPopup)}>
    <div className='w-full md:w-1/2  bg-white flex flex-col items-center gap-2 p-4 rounded-lg' onClick={e=>e.stopPropagation()}>
      <h2 className='font-semibold'>Add Your signature</h2>
    <SignatureCanvas
                penColor="black"
                canvasProps={{
                  width: 400,
                  height:200,
                  className: "sigCanvas",
                  style: {
                    border: "1px solid #000",
                    backgroundColor: "#9ca3af",
                    borderRadius: "10px",
                  },
                }}
                ref={signatureRef}
              />

              {/* Buttons to handle the save and clear methods */}
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  type="button"
                  style={{
                    background: "#e74c3c",
                    color: "white",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                  onClick={handleClear}
                >
                  {t("Clear")}
                </button>
                <button
                  type="button"
                  style={{
                    background: "#2ecc71",
                    color: "white",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={handleSave}
                >
                  {t("Save")}
                </button>
              </div>
        </div>
        </div>
  )
}
