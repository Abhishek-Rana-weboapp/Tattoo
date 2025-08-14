// Import necessary modules and components
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConsentFormLayout from "./Layout/FormLayout";
import ProgressBar from "./ProgressBar";
import { useTranslation } from "react-i18next";
import UserContext from "../context/UserContext";
import { terms } from "../data/TermOfServiceQuestions";
import LoaderModal from "./modal/LoaderModal";
import { useAppointmentContext } from "../context/AppointmentContext";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axiosInstance from "../config/axios";
// Define the component
function TermsOfService() {
  const { appointmentData, setAppointment, setAppointmentData} = useAppointmentContext();
  const { user, initials, guardianInitials,updateValues } = useAuthContext();
  const { t } = useTranslation();
  const pageContents = terms[appointmentData.typeofservice];
  const [initialsPerPage, setInitialsPerPage] = useState({});
  const [guardianInitialsPerPage, setGuardianInitialsPerPage] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [progressValue_, setProgressValue_] = useState(1);
  const [loading, setLoading] = useState(false);

  // Navigation function
  const navigate = useNavigate();

  // Navigate to the next page

  const nextPage = async () => {
    if (!initialsPerPage[currentPage]) {
      toast.error(t("Please provide your initials"));
      return;
    }
    if (user.minor && !guardianInitialsPerPage[currentPage]) {
      toast.error(t("Please provide guardian's initials"));
      return;
    }
    if (currentPage < pageContents.length) {
      setProgressValue_(progressValue_ + 1);
      setCurrentPage(currentPage + 1);
    } else {
      setLoading(true)
      const data = {...appointmentData , termsOfService : "agreed", ...updateValues}
      try {
        const response = await axiosInstance.post("appointment/post",data );
        if(response.status === 201){
          toast.success("Appointment Created successfully")
          setAppointment(response.data.appointment)
          navigate("/verify")
          // setAppointment(response.data)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || "Something went wrong")
      }
      finally{
        setLoading(false)
      }
    }
  };

  // Navigate to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setProgressValue_(progressValue_ - 1);
      setCurrentPage(currentPage - 1);
    }
    if (currentPage === 1) {
      navigate(-1);
    }
  };

  const handleCheckbox = (e, page) => {
    const checked = e.target.checked;
    if (e.target.name === "initials") {
      setInitialsPerPage((prev) => ({
        ...prev,
        [page]: checked ? initials : "",
      }));
    }
    if (e.target.name === "guardianInitials") {
      setGuardianInitialsPerPage((prev) => ({
        ...prev,
        [page]: checked ? guardianInitials : "",
      }));
    }
  };

  if (loading) {
    return <LoaderModal />;
  }


  // Return the JSX structure
  return (
    <ConsentFormLayout title="Terms of Service">
      <div className="flex flex-col gap-2 flex-1 md:p-1 p-2 justify-between overflow-hidden">
        <div className="flex flex-col gap-3 overflow-auto">
          <label className="font-bold text-sm md:text-2xl text-white  uppercase text-center ">
            {pageContents !== undefined &&
              t(pageContents[currentPage - 1]?.heading)}{" "}
            :
          </label>
          {pageContents.length > 0 &&
            Object.keys(pageContents[currentPage - 1]).includes(
              "subHeading"
            ) && (
              <label className=" text-[0.60rem] md:text-xl text-white  uppercase text-center ">
                {pageContents[currentPage - 1].subHeading}
              </label>
            )}
          <div className="overflow-auto scrollbar-thin scrollbar-track-slate-[#000000] scrollbar-thumb-slate-500 scrollbar-thumb-rounded scrollbar-track-rounded">
            <ul className="text-white font-semibold  list-disc flex flex-col gap-2">
              {pageContents !== undefined &&
                pageContents[currentPage - 1]?.terms.map((term) => {
                  return <li key={term}>{t(term)}</li>;
                })}
            </ul>
          </div>
          {pageContents.length > 0 &&
            Object.keys(pageContents[currentPage - 1]).includes(
              "bottomHeading"
            ) && (
              <label className="text-xs md:text-xl text-white  uppercase text-center flex items-center">
                * {pageContents[currentPage - 1].bottomHeading}
              </label>
            )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex  justify-between items-center gap-2 max-w-xl mx-auto w-full">
            <label className="text-white text-sm md:text-base flex gap-2 items-center hover:cursor-pointer">
              <input
                type="checkbox"
                className="w-6 h-6"
                name="initials"
                checked={!!initialsPerPage[currentPage]}
                onChange={(e) => handleCheckbox(e, currentPage)}
              ></input>
              {t("Select to add your initials")}
            </label>
            <input
              type="text"
              value={initialsPerPage[currentPage] ? initials : ""}
              disabled
              // onChange={(e) => handleInitialsChange(currentPage, e.target.value)}
              className="bg-gray-700 text-white p-2 rounded-md w-20 Blacksword"
            />
          </div>

          {user.minor && (
            <div className="flex  justify-between items-center gap-2 max-w-xl mx-auto w-full">
              <label className="text-white text-sm md:text-base flex gap-2 items-center hover:cursor-pointer">
                <input
                  type="checkbox"
                  className="w-6 h-6"
                  name="guardianInitials"
                  checked={!!guardianInitialsPerPage[currentPage]}
                  onChange={(e) => handleCheckbox(e, currentPage)}
                ></input>
                {t("Select to add guardian's initials")}
              </label>
              <input
                type="text"
                value={
                  guardianInitialsPerPage[currentPage] ? guardianInitials : ""
                }
                disabled
                // onChange={(e) => handleInitialsChange(currentPage, e.target.value)}
                className="bg-gray-700 text-white p-2 rounded-md w-20 Blacksword"
              />
            </div>
          )}
        </div>
      </div>
      <ProgressBar progress={progressValue_} count={3} />
      <div className="flex justify-between mt-4">
        <button
          className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
          onClick={prevPage}
        >
          {t("Back")}
        </button>
        <button
          className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
          onClick={nextPage}
        >
          {t("Next")}
        </button>
      </div>
    </ConsentFormLayout>
  );
}

// Export the component
export default TermsOfService;

// // Import necessary modules and components
// import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ConsentFormLayout from "./Layout/FormLayout";
// import ProgressBar from "./ProgressBar";
// import { useTranslation } from "react-i18next";
// import UserContext from "../context/UserContext";
// import {
//   piercingTerms,
//   pmuTerms,
//   tattooRemovalTerms,
//   tattooTerms,
//   toothGemTerms,
// } from "../data/TermOfServiceQuestions";
// import LoaderModal from "./modal/LoaderModal";
// // Define the component
// function TermsOfService() {
//   const { t } = useTranslation();
//   const apiUrl = process.env.REACT_APP_API_BASE_URL;

//   // State and initialization
//   const [progressValue_, setProgressValue_] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [initials, setInitials] = useState({});
//   const [guardianInitials, setGuardianInitials] = useState({});
//   const totalPages = 3;
//   const [storedInitials, setStoredInitials] = useState(
//     sessionStorage.getItem("initials")
//   );
//   const guardianInfo = sessionStorage.getItem("guardianInfo");
//   const [storedGuardianInitials, setStoredGuardianInitials] = useState(
//     sessionStorage.getItem("guardianInitials")
//   );
//   const [loading, setLoading] = useState(false);
//   const minor = sessionStorage.getItem("minor");
//   const token = sessionStorage.getItem("token") || "";

//   const {
//     user,
//     alert,
//     setAlert,
//     setAlertMessage,
//     formData,
//     emerformData,
//     drformData,
//     harmlessagreement,
//     guardianSignature,
//     description,
//     count,
//     finalUser,
//   } = useContext(UserContext);
//   const tattooRules = tattooTerms;
//   const piercingRules = piercingTerms;
//   const pmuRules = pmuTerms;
//   const tattooRemovalRules = tattooRemovalTerms;
//   const toothGemRules = toothGemTerms;
//   const [pageContents, setpageContents] = useState([]);
//   const service = sessionStorage.getItem("typeofservice");

//   useEffect(() => {
//     if (service) {
//       switch (service) {
//         case "tattoo":
//           setpageContents(tattooRules);
//           break;
//         case "piercing":
//           setpageContents(piercingRules);
//           break;
//         case "permanent-makeup":
//           setpageContents(pmuRules);
//           break;
//         case "removal":
//           setpageContents(tattooRemovalRules);
//           break;
//         case "tooth-gems":
//           setpageContents(toothGemRules);
//           break;
//         case "smp":
//           setpageContents(pmuRules);
//           break;
//         default:
//           console.log("No Tattoo Type Selected");
//       }
//     }
//   }, []);

//   // Navigation function
//   const navigate = useNavigate();

//   // Navigate to the next page

//   const nextPage = ()=>{
//    if(!initials[currentPage]){
//     setAlert(!alert);
//     setAlertMessage("Please provide your initials");
//     return
//    }
//    if(minor==="true"){
//        if(!guardianInitials[currentPage]){
//         setAlert(!alert);
//         setAlertMessage("Please provide guardians initials");
//         return
//        }
//    }
//    if(currentPage < 3){
//     setProgressValue_(progressValue_ + 1);
//     setCurrentPage(currentPage + 1);
//    }else{
//     handleSubmit()
//    }

//   }

//   // Navigate to the previous page
//   const prevPage = () => {
//     if (currentPage > 1) {
//       setProgressValue_(progressValue_ - 1);
//       setCurrentPage(currentPage - 1);
//     }
//     if (currentPage === 1) {
//       navigate(-1);
//     }
//   };

//   console.log(finalUser)

//   const handleSubmit = async () => {
//     const username = sessionStorage.getItem("username");
//     const minor = sessionStorage.getItem("minor");
//     console.log(username , minor, user, finalUser)
//     if (!username || !minor || !user || !finalUser) return;
//     setLoading(true);

//       let data = JSON.stringify({
//         username: username,
//         minor: minor,
//         typeofservice: user.selectedTattooType,
//         firstname: sessionStorage.getItem("firstname"),
//         lastname: sessionStorage.getItem("lastname"),
//         body_location: JSON.stringify(finalUser),
//         medicalhistory: JSON.stringify(formData),
//         emergencycontactnumber: JSON.stringify(emerformData),
//         doctor_information: JSON.stringify(drformData),
//         WaiverRelease_url: JSON.stringify(initials),
//         HoldHarmlessAgreement_url: JSON.stringify(harmlessagreement),
//         id_url: null,
//         count: count,
//         brief_description: JSON.stringify(description),
//         ArtistPiercerNames: null,
//       });

//       if (minor === "true") {
//         data = JSON.stringify({
//           ...JSON.parse(data),
//           Consent_form: "agreed",
//           guardian_initials: storedGuardianInitials,
//           guardian_signature: guardianSignature,
//           guardian_info: guardianInfo,
//         });
//       }

//     try {
//           const response = await fetch(`${apiUrl}appointmentData/post`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: data,
//           });
//           const responseData = await response.json();
//           if (response.status === 201) {
//             sessionStorage.setItem("appointmentID", responseData.userData.id);
//             sessionStorage.setItem(
//               "appointment_detail",
//               JSON.stringify(responseData.userData)
//             );
//             setLoading(false);
//             navigate("/verify");
//             return;
//           } else {
//             setLoading(false);
//             setAlertMessage(t("Please fill in all the required fields"));
//             setAlert(!alert);
//           }
//         } catch (error) {
//           setLoading(false);
//           console.error("Error:", error);
//         }
//   };

//   const handleCheckbox = (e) => {
//     if (e.target.checked === true) {
//       setInitials((prev) => ({ ...prev, [currentPage]: storedInitials }));
//     }
//     if (e.target.checked === false) {
//       setInitials((prev) => ({ ...prev, [currentPage]: "" }));
//     }
//   };

//   const handleGuardianCheckbox = (e) => {
//     if (e.target.checked === true) {
//       setGuardianInitials((prev) => ({
//         ...prev,
//         [currentPage]: storedGuardianInitials,
//       }));
//     }
//     if (e.target.checked === false) {
//       setGuardianInitials((prev) => ({ ...prev, [currentPage]: "" }));
//     }
//   };

//   if (loading) {
//     return <LoaderModal />;
//   }

//   // Return the JSX structure
//   return (
//     <ConsentFormLayout title="Terms of Service">
//       <div className="flex flex-col gap-2 flex-1 md:p-1 p-2 justify-between overflow-hidden">
//         <div className="flex flex-col gap-3 overflow-auto">
//           <label className="font-bold text-sm md:text-2xl text-white  uppercase text-center ">
//             {pageContents !== undefined &&
//               t(pageContents[currentPage - 1]?.heading)}{" "}
//             :
//           </label>
//           {pageContents.length > 0 &&
//             Object.keys(pageContents[currentPage - 1]).includes(
//               "subHeading"
//             ) && (
//               <label className=" text-[0.60rem] md:text-xl text-white  uppercase text-center ">
//                 {pageContents[currentPage - 1].subHeading}
//               </label>
//             )}
//           <div className="overflow-auto scrollbar-thin scrollbar-track-slate-[#000000] scrollbar-thumb-slate-500 scrollbar-thumb-rounded scrollbar-track-rounded">
//             <ul className="text-white font-semibold  list-disc flex flex-col gap-2">
//               {pageContents !== undefined &&
//                 pageContents[currentPage - 1]?.terms.map((term) => {
//                   return <li key={term}>{t(term)}</li>;
//                 })}
//             </ul>
//           </div>
//           {pageContents.length > 0 &&
//             Object.keys(pageContents[currentPage - 1]).includes(
//               "bottomHeading"
//             ) && (
//               <label className="text-xs md:text-xl text-white  uppercase text-center flex items-center">
//                 * {pageContents[currentPage - 1].bottomHeading}
//               </label>
//             )}
//         </div>
//         <div className="flex flex-col gap-1">
//           <div className="flex  justify-between items-center gap-2 md:w-3/4 lg:w-2/4 mx-auto w-full">
//             <label className="text-white text-sm md:text-base flex gap-2 items-center hover:cursor-pointer">
//               <input
//                 type="checkbox"
//                 className="w-6 h-6"
//                 checked={initials[currentPage]}
//                 onChange={handleCheckbox}
//               ></input>
//               {t("Select to add your initials")}
//             </label>
//             <input
//               type="text"
//               value={initials[currentPage] || ""}
//               disabled
//               // onChange={(e) => handleInitialsChange(currentPage, e.target.value)}
//               className="bg-gray-700 text-white p-2 rounded-md w-20 Blacksword"
//             />
//           </div>

//           {minor === "true" && (
//             <div className="flex  justify-between items-center gap-2 md:w-3/4 lg:w-2/4 mx-auto w-full">
//               <label className="text-white text-sm md:text-base flex gap-2 items-center hover:cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="w-6 h-6"
//                   checked={guardianInitials[currentPage]}
//                   onChange={handleGuardianCheckbox}
//                 ></input>
//                 {t("Select to add guardian's initials")}
//               </label>
//               <input
//                 type="text"
//                 value={guardianInitials[currentPage] || ""}
//                 disabled
//                 // onChange={(e) => handleInitialsChange(currentPage, e.target.value)}
//                 className="bg-gray-700 text-white p-2 rounded-md w-20 Blacksword"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//       <ProgressBar progress={progressValue_} count={3} />
//       <div className="flex justify-between mt-4">
//         <button
//           className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
//           onClick={prevPage}
//         >
//           {t("Back")}
//         </button>
//         <button
//           className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
//           onClick={nextPage}
//         >
//           {t("Next")}
//         </button>
//       </div>
//     </ConsentFormLayout>
//   );
// }

// // Export the component
// export default TermsOfService;
