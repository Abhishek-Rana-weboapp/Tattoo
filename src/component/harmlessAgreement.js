import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppointmentContext } from "../context/AppointmentContext";
import { useAuthContext } from "../context/AuthContext";
import { apiUrl } from "../url";
import toast from "react-hot-toast";

function HoldHarmlessAgreement() {
  const navigate = useNavigate();
  const { appointmentData, setAppointmentData } = useAppointmentContext();
  const { user, fullName, guardianfullName } = useAuthContext();
  const {t} = useTranslation();
  const [checked, setChecked] = useState(false);
  const [guardianChecked, setGuardianChecked] = useState(false);

  const handleSubmit = ()=>{
      if(!checked) {
        toast.error(t("Please agree to the terms"));
        return;
      }
      if (user.minor && !guardianChecked) {
        toast.error(t("Please agree to the guardian terms"));
        return;
      }
      setAppointmentData((prev) => ({
        ...prev,
        holdHarmlessAgreement : "agreed"
      }));
      navigate("/term");
  }

  useEffect(()=>{
    if(appointmentData.holdHarmlessAgreement === "agreed") {
      setChecked(true);
      if (user.minor) {
        setGuardianChecked(true);
      }
    }
  },[appointmentData, user])

  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-between p-4 md:p-8 text-white  md:w-4/6 overflow-hidden">
      <label className="font-bold text-xl  md:text-4xl text-white  uppercase text-center">
        {t("Hold Harmless Agreement")}
      </label>
      <div className="flex flex-col flex-1 p-2 rounded-md gap-2 justify-between overflow-hidden backdrop-blur bg-opacity-50">
        <div className="overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-800 scrollbar-thumb-rounded scrollbar-track-rounded p-2">
          <p className="text-center outline-1 outline-white">
            {t("I,")} <span className="font-bold">{fullName} </span>
            {user.minor && t(`and I, the guardian `)}{" "}{user.minor && (
                <span className="font-bold"> {guardianfullName}</span>
            )}
            {t(
              " hereby acknowledge and agree that as a patron and customer of Fame Tattoos, Inc., its premises, facility, services, and products, involves risks of injury to persons or property, including but not limited to those described below, and patron/customer assumes full responsibility for such risks. In consideration of being a patron/customer of Fame Tattoos, Inc., for any purpose including, but not limited to, tattoo services, piercing services, tattoo removal services, tooth gems, observation, use of shop equipment, services, or participation in any way, patron/customer agrees to the following: Patron/Customer hereby releases and holds Fame Tattoos, Inc., its directors, officers, employees, independent contractors, and agents harmless from all liability to any patron/customer, their children, personal representatives, assigns, heirs, and next of kin for any loss, damage, personal injury, deformity, death, and forever gives up any claims or demands therefore, on account of injury to patron/customer's person or property, including injury leading to disfigurement or death of patron/customer, whether caused by the active or passive negligence of Fame Tattoos, Inc., or otherwise, to the fullest extent permitted by law, while patron/customer is in, upon, or about the Fame Tattoos, Inc., premises using or not using their services, facility, or equipment."
            )}
          </p>
        </div>  

        {/* Client Section */}

        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col md:mx-auto gap-2  items-start">
            <label className="text-sm flex gap-2 items-center hover:cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              {t("Select to add your name , initials and signature")}
            </label>
            <div className="flex md:flex-row flex-col gap-2">
              <div className="flex gap-1 items-center md:justify-end justify-start md:mr-5">
                <label className="text-xs">{t("Name")}:</label>
                <input
                  // ref={inputRef}
                  className="bg-gray-700 text-white rounded-md px-2 py-1"
                  type="text"
                  value={checked ? fullName : ""}
                  disabled
                />
              </div>
              <div className="flex gap-4 ">
                <div className="flex gap-1 items-center justify-start w-2/5">
                  <label className="text-xs">{t("Initials")}:</label>
                  <input
                    className="bg-gray-700 text-white rounded-md px-2 py-1 Blacksword w-full"
                    type="text"
                    value={checked ? appointmentData.initials : ""}
                    disabled
                  />
                </div>
                {checked && appointmentData.signatureImage && (
                  <div className=" h-10 w-2/5 flex justify-center ">
                    <img
                      className="w-full h-full bg-white rounded-md"
                      src={`${apiUrl}${appointmentData.signatureImage}`}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* guardian section */}
          {user.minor && (
            <div className="flex flex-col md:mx-auto gap-2  items-start">
              <label className="text-sm flex gap-2 hover:cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={guardianChecked}
                  onChange={() => setGuardianChecked(!guardianChecked)}
                />
                {t("Select to add guardian's name , initials and signature")}
              </label>
              <div className="flex md:flex-row flex-col gap-2">
                <div className="flex gap-1 items-center md:justify-end justify-start md:mr-2">
                  <label className="text-xs">{t("Name")}:</label>
                  <input
                    className="bg-gray-700 text-white rounded-md px-2 py-1"
                    type="text"
                    value={guardianChecked ? guardianfullName : ""}
                    disabled
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex gap-2 items-center justify-start w-2/5">
                    <label className="text-xs">{t("Initials")}:</label>
                    <input
                      className="bg-gray-700 text-white rounded-md px-2 py-1 Blacksword w-full"
                      type="text"
                      value={guardianChecked ?  appointmentData.guardianInitials : ""}
                      disabled
                    />
                  </div>
                  {guardianChecked && appointmentData.guardianSignatureImage && (
                    <div className="h-10 w-2/5 flex justify-center ">
                      <img
                        className="w-full h-full bg-white rounded-md"
                        src={`${apiUrl}${appointmentData.guardianSignatureImage}`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex justify-between">
          <button
            type="submit"
            className="bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
            onClick={() => navigate(-1)}
          >
            {t("Back")}
          </button>
          <button
            type="submit"
            className="bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
            onClick={handleSubmit}
          >
            {t("Next")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HoldHarmlessAgreement;

// import { useContext, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import UserContext from "../context/UserContext";
// import { useTranslation } from "react-i18next";

// function HoldHarmlessAgreement() {
//   const { harmlessagreement, setharmlessagreement } =
//     useContext(UserContext);
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const {
//     alert,
//     setAlert,
//     setAlertMessage,
//     signature,
//     guardianSignature,
//     initialsImg,
//     guardianInitialsImg
//   } = useContext(UserContext);
//   const inputRef = useRef();
//   const storedGuardianInitials = sessionStorage.getItem("guardianInitials")
//   const guardianInfo =  JSON.parse(sessionStorage.getItem("guardianInfo")) || {} ;
//   const minor = sessionStorage.getItem("minor")

//   const initials = sessionStorage.getItem("initials");
//   const name = `${sessionStorage.getItem("firstname")} ${sessionStorage.getItem(
//     "lastname"
//   )}`;

//   useEffect(() => {
//     inputRef?.current?.focus();
//   }, []);

//   const handleAgreementToggle = (e) => {
//     setharmlessagreement((prev) => ({ ...prev, agreed: e.target.checked }));
//     if (e.target.checked === true) {
//       setharmlessagreement((prev) => ({
//         ...prev,
//         initials: initials,
//         name: name,
//         signatureurl: signature,
//         initialsImg
//       }));
//     } else {
//       setharmlessagreement((prev) => ({
//         ...prev,
//         initials: "",
//         name: "",
//         signatureurl: undefined,
//         initialsImg:""
//       }));
//     }
//   };

//   const handleGuardianAgreementToggle = (e)=>{
//     setharmlessagreement((prev) => ({ ...prev, guardianAgreed: e.target.checked }));
//     if (e.target.checked === true) {
//       setharmlessagreement((prev) => ({
//         ...prev,
//         guardianInitials: storedGuardianInitials,
//         guardianName: `${guardianInfo?.firstName} ${guardianInfo?.lastName}`,
//         guardianSignature: guardianSignature,
//         guardianInitialsImg
//       }));
//     } else {
//       setharmlessagreement((prev) => ({
//         ...prev,
//         guardianInitials: "",
//         guardianName: "",
//         guardianSignature: undefined,
//         guardianInitialsImg:""
//       }));
//     }
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if(minor === "true"){
//       if(!harmlessagreement?.name||
//           !harmlessagreement?.initials ||
//           !harmlessagreement?.agreed ||
//           !harmlessagreement?.signatureurl||
//           !harmlessagreement?.guardianInitials ||
//           !harmlessagreement?.guardianSignature){
//             setAlert(!alert);
//             setAlertMessage(t("Please fill in all the required fields"));
//               return;
//       }
//     }else{
//       if(!harmlessagreement?.name||
//         !harmlessagreement?.initials ||
//         !harmlessagreement?.agreed ||
//         !harmlessagreement?.signatureurl){
//           setAlert(!alert);
//           setAlertMessage(t("Please fill in all the required fields"));
//             return;
//     }
//     }
//     navigate("/term");
//     return
//   };

//   return (
//     <div className="w-full h-full flex flex-col gap-2 items-center justify-between p-4 md:p-8 text-white  md:w-4/6 overflow-hidden">
//       <label className="font-bold text-xl  md:text-4xl text-white  uppercase text-center">
//         {t("Hold Harmless Agreement")}
//       </label>
//       <div className="flex flex-col flex-1 p-2 rounded-md gap-2 justify-between overflow-hidden backdrop-blur bg-opacity-50">
//         <div className="overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-800 scrollbar-thumb-rounded scrollbar-track-rounded p-2" >
//           <p className="text-center outline-1 outline-white">
//             {t("I,")} <span className="font-bold">{harmlessagreement?.name}{" "}</span>
//             {minor === "true" && t(`and I, the guardian `)}{minor === "true" && <span className="font-bold"> {harmlessagreement?.guardianName}</span> }
//             {t(
//               " hereby acknowledge and agree that as a patron and customer of Fame Tattoos, Inc., its premises, facility, services, and products, involves risks of injury to persons or property, including but not limited to those described below, and patron/customer assumes full responsibility for such risks. In consideration of being a patron/customer of Fame Tattoos, Inc., for any purpose including, but not limited to, tattoo services, piercing services, tattoo removal services, tooth gems, observation, use of shop equipment, services, or participation in any way, patron/customer agrees to the following: Patron/Customer hereby releases and holds Fame Tattoos, Inc., its directors, officers, employees, independent contractors, and agents harmless from all liability to any patron/customer, their children, personal representatives, assigns, heirs, and next of kin for any loss, damage, personal injury, deformity, death, and forever gives up any claims or demands therefore, on account of injury to patron/customer's person or property, including injury leading to disfigurement or death of patron/customer, whether caused by the active or passive negligence of Fame Tattoos, Inc., or otherwise, to the fullest extent permitted by law, while patron/customer is in, upon, or about the Fame Tattoos, Inc., premises using or not using their services, facility, or equipment."
//             )}
//           </p>
//         </div>

//         {/* Client Section */}

//         <div class="flex flex-col gap-4">
//           <div className="flex flex-col md:mx-auto gap-2  items-start">
//             <label className="text-sm flex gap-2 items-center hover:cursor-pointer">
//               <input
//                 type="checkbox"
//                 className="w-5 h-5"
//                 checked={harmlessagreement?.agreed}
//                 onChange={handleAgreementToggle}
//               />
//                 {t("Select to add your name , initials and signature")}
//               </label>
//             <div class="flex md:flex-row flex-col gap-2">
//               <div className="flex gap-1 items-center md:justify-end justify-start md:mr-5">
//                 <label className="text-xs">{t("Name")}:</label>
//                 <input
//                   ref={inputRef}
//                   className="bg-gray-700 text-white rounded-md p-2"
//                   type="text"
//                   value={harmlessagreement?.name}
//                   disabled
//                 />
//               </div>
//               <div className="flex gap-4 ">
//               <div className="flex gap-1 items-center justify-start w-2/5">
//                 <label className="text-xs">{t("Initials")}:</label>
//                 <input
//                   className="bg-gray-700 text-white rounded-md p-2 Blacksword w-full"
//                   type="text"
//                   value={harmlessagreement?.initials}
//                   disabled
//                   />
//               </div>
//                       {harmlessagreement?.signatureurl && (
//               <div className=" h-10 w-2/5 flex justify-center ">
//                 <img
//                   className="w-full h-full bg-white"
//                   src={harmlessagreement?.signatureurl}
//                   />
//               </div>
//                       )}
//                       </div>
//             </div>
//           </div>

//               {/* guardian section */}
//           {minor === "true" && <div className="flex flex-col md:mx-auto gap-2  items-start">
//               <label className="text-sm flex gap-2 hover:cursor-pointer">
//               <input
//                 type="checkbox"
//                 className="w-5 h-5"
//                 checked={harmlessagreement?.guardianAgreed }
//                 onChange={handleGuardianAgreementToggle}
//               />
//                 {t("Select to add guardian's name , initials and signature")}
//               </label>
//             <div className="flex md:flex-row flex-col gap-2">
//               <div className="flex gap-1 items-center md:justify-end justify-start md:mr-2">
//                 <label className="text-xs">{t("Name")}:</label>
//                 <input
//                   ref={inputRef}
//                   className="bg-gray-700 text-white rounded-md p-2"
//                   type="text"
//                   value={harmlessagreement?.guardianName}
//                   disabled
//                 />
//               </div>
//               <div className="flex gap-4">
//               <div className="flex gap-2 items-center justify-start w-2/5">
//                 <label className="text-xs">{t("Initials")}:</label>
//                 <input
//                   className="bg-gray-700 text-white rounded-md p-2 Blacksword w-full"
//                   type="text"
//                   value={harmlessagreement?.guardianInitials}
//                   disabled
//                 />
//               </div>
//                       {harmlessagreement?.guardianSignature && (
//               <div className="h-10 w-2/5 flex justify-center ">
//                   <img
//                   className="w-full h-full bg-white"
//                   src={harmlessagreement?.guardianSignature}
//                   />
//               </div>
//                       )}
//                       </div>
//             </div>
//           </div>}
//         </div>

//         <div className="w-full flex justify-between">
//           <button
//             type="submit"
//             className="bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
//             onClick={() => navigate(-1)}
//           >
//             {t("Back")}
//           </button>
//           <button
//             type="submit"
//             className="bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
//             onClick={handleSubmit}
//           >
//             {t("Next")}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HoldHarmlessAgreement;
