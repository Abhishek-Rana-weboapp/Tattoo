import React, { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import SignatureCanvas from "react-signature-canvas";
import UserContext from "../../../context/UserContext";
import { apiUrl } from "../../../url";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CompleteAgreement() {
  const { t } = useTranslation();
  const signatureRef = useRef();
  const navigate = useNavigate()
  const {updateAppointment, setUpdateAppointment, setAlert, setAlertMessage,alert} = useContext(UserContext)

  const handleSave= async()=>{
   if(signatureRef?.current?.isEmpty()){
    setAlertMessage(t("Please provide your signature"))
    setAlert(!alert)
   }else{
    const dataUrl = signatureRef?.current?.toDataURL()
    const data = {
        id:updateAppointment?.id,
        updateField : "Sign_completion",
        updateValue : dataUrl
    }
    await axios.post(`${apiUrl}/artist/post_new`,data).then((res)=>{
       if(res.status === 201){
        setAlertMessage(t("Signature Uploaded"))
        setAlert(!alert)
        navigate("/artist-dashboard")
       }
    }).catch(err=>{
       console.err(err)
    })
   }
  }

  const handleClear = ()=>{
    signatureRef?.current?.clear()
  }

  console.log(updateAppointment)

  return (
    <div className="flex md:w-2/4 w-full flex-col gap-3 items-center overflow-hidden p-2">
      <h3 className="text-white font-bold text-center">
        {t(
          "Staff Acknowledgment of Service Completion and Client Information Verification."
        )}
      </h3>
      <div className="overflow-auto p-2">
        <p className="text-center">
          {t(`Yo,`)} {},
          {t(
            `por la presente confirmo que he revisado minuciosamente la información enviada por el cliente, incluido su historial médico, detalles de contacto de emergencia e información del médico. También me he asegurado de que el cliente haya firmado y aceptado debidamente las exenciones de responsabilidad, el acuerdo de exención de responsabilidad y los términos de servicio. Como contratista independiente o empleado de Fame Tattoos Inc., afirmo que he completado de manera competente los servicios solicitados por el cliente en Fame Tattoos Inc., de acuerdo con sus instrucciones.`
          )}
        </p>
      </div>
      <div>
        <div className="">
          <SignatureCanvas
            penColor="black"
            canvasProps={{
              width: 250,
              height: 150,
              className: "sigCanvas",
              style: {
                border: "1px solid #000",
                backgroundColor: "#9ca3af",
                borderRadius: "10px",
              },
            }}
            ref={signatureRef}
          />
        </div>
        <div className="flex justify-center gap-2">
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
  );
}
