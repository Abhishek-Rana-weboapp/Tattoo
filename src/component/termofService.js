// Import necessary modules and components
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConsentFormLayout from "./Layout/FormLayout";
import ProgressBar from "./ProgressBar";
import { useTranslation } from "react-i18next";
import UserContext from "../context/UserContext";
import {
  piercingTerms,
  pmuTerms,
  tattooRemovalTerms,
  tattooTerms,
  toothGemTerms,
} from "../data/TermOfServiceQuestions";
import LoaderModal from "./modal/LoaderModal";
// Define the component
function TermsOfService() {
  const { t } = useTranslation();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  // State and initialization
  const [progressValue_, setProgressValue_] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [initials, setInitials] = useState({});
  const [gaurdianInitials, setGaurdianInitials] = useState({});
  const totalPages = 3;
  const [storedInitials, setStoredInitials] = useState(
    sessionStorage.getItem("initials")
  );
  const gaurdianInfo = sessionStorage.getItem("gaurdianInfo");
  const [storedGaurdianInitials, setStoredGaurdianInitials] = useState(
    sessionStorage.getItem("gaurdianInitials")
  );
  const [loading, setLoading] = useState(false);
  const minor = sessionStorage.getItem("minor");
  const token = sessionStorage.getItem("token") || "";



  const {
    user,
    alert,
    setAlert,
    setAlertMessage,
    formData,
    emerformData,
    drformData,
    harmlessagreement,
    gaurdianSignature,
    description,
    count,
    finalUser,
  } = useContext(UserContext);
  const tattooRules = tattooTerms;
  const piercingRules = piercingTerms;
  const pmuRules = pmuTerms;
  const tattooRemovalRules = tattooRemovalTerms;
  const toothGemRules = toothGemTerms;
  const [pageContents, setpageContents] = useState([]);
  const service = sessionStorage.getItem("typeofservice");

  useEffect(() => {
    if (service) {
      switch (service) {
        case "tattoo":
          setpageContents(tattooRules);
          break;
        case "piercing":
          setpageContents(piercingRules);
          break;
        case "permanent-makeup":
          setpageContents(pmuRules);
          break;
        case "removal":
          setpageContents(tattooRemovalRules);
          break;
        case "tooth-gems":
          setpageContents(toothGemRules);
          break;
        case "smp":
          setpageContents(pmuRules);
          break;
        default:
          console.log("No Tattoo Type Selected");
      }
    }
  }, []);

  // Navigation function
  const navigate = useNavigate();

  // Navigate to the next page

  const nextPage = ()=>{
   if(!initials[currentPage]){
    setAlert(!alert);
    setAlertMessage("Please provide your initials");
    return
   }
   if(minor==="true"){
       if(!gaurdianInitials[currentPage]){
        setAlert(!alert);
        setAlertMessage("Please provide gaurdians initials");
        return
       }
   }
   if(currentPage < 3){
    setProgressValue_(progressValue_ + 1);
    setCurrentPage(currentPage + 1);
   }else{
    handleSubmit()
   }

  }

  // const nextPage = () => {
  //   if(!minor){
  //     if (!initials[currentPage]) {
  //       setAlert(!alert);
  //       setAlertMessage("Please provide your initials");
  //       return
  //     }
  //   } else {
  //     if (currentPage < totalPages) {
  //       setProgressValue_(progressValue_ + 1);
  //       setCurrentPage(currentPage + 1);
  //     } else if (currentPage === 3) {
  //       handleSubmit();
  //     }
  //   }
  // };

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



  const handleSubmit = async () => {
    const username = sessionStorage.getItem("username");
    const minor = sessionStorage.getItem("minor");
    console.log(username , minor, user, finalUser)
    if (!username || !minor || !user || !finalUser) return;
    setLoading(true);

      let data = JSON.stringify({
        username: username,
        minor: minor,
        typeofservice: user.selectedTattooType,
        firstname: sessionStorage.getItem("firstname"),
        lastname: sessionStorage.getItem("lastname"),
        body_location: JSON.stringify(finalUser),
        medicalhistory: JSON.stringify(formData),
        emergencycontactnumber: JSON.stringify(emerformData),
        doctor_information: JSON.stringify(drformData),
        WaiverRelease_url: JSON.stringify(initials),
        HoldHarmlessAgreement_url: JSON.stringify(harmlessagreement),
        id_url: null,
        count: count,
        brief_description: JSON.stringify(description),
        ArtistPiercerNames: null,
      });

      if (minor === "true") {
        data = JSON.stringify({
          ...JSON.parse(data),
          Consent_form: "agreed",
          gaurdian_initials: storedGaurdianInitials,
          guardian_signature: gaurdianSignature,
          guardian_info: gaurdianInfo,
        });
      }


    try {
          const response = await fetch(`${apiUrl}appointment/post`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: data,
          });
          const responseData = await response.json();
          if (response.status === 201) {
            sessionStorage.setItem("appointmentID", responseData.userData.id);
            sessionStorage.setItem(
              "appointment_detail",
              JSON.stringify(responseData.userData)
            );
            setLoading(false);
            navigate("/verify");
            return;
          } else {
            setLoading(false);
            setAlertMessage(t("Please fill in all the required fields"));
            setAlert(!alert);
          }
        } catch (error) {
          setLoading(false);
          console.error("Error:", error);
        }
  };

  // const handleSubmit = async () => {
  //   setLoading(true);
  //   const username = sessionStorage.getItem("username");
  //   const minor = sessionStorage.getItem("minor");

  //   let data = JSON.stringify({
  //     username: username,
  //     minor: minor,
  //     typeofservice: user.selectedTattooType,
  //     firstname: sessionStorage.getItem("firstname"),
  //     lastname: sessionStorage.getItem("lastname"),
  //     body_location: JSON.stringify(finalUser ),
  //     medicalhistory: JSON.stringify(formData),
  //     emergencycontactnumber: JSON.stringify(emerformData),
  //     doctor_information: JSON.stringify(drformData),
  //     WaiverRelease_url: JSON.stringify(initials),
  //     HoldHarmlessAgreement_url: JSON.stringify(harmlessagreement),
  //     id_url: null,
  //     count: count,
  //     brief_description: JSON.stringify(description),
  //     ArtistPiercerNames: null,
  //   });

  //   if (minor === "true") {
  //     data = JSON.stringify({
  //       ...JSON.parse(data),
  //       Consent_form: "agreed",
  //       gaurdian_initials: storedGaurdianInitials,
  //       guardian_signature: gaurdianSignature,
  //       guardian_info: gaurdianInfo,
  //     });
  //   }
  // if (minor === "true") {
  //   data = JSON.stringify({
  //     username: username,
  //     minor: minor,
  //     typeofservice: user.selectedTattooType,
  //     firstname: sessionStorage.getItem("firstname"),
  //     lastname: sessionStorage.getItem("lastname"),
  //     body_location: JSON.stringify(finalUser),
  //     medicalhistory: JSON.stringify(formData),
  //     Consent_form: "agreed",
  //     gaurdian_initials: storedGaurdianInitials,
  //     guardian_signature: gaurdianSignature,
  //     guardian_info: gaurdianInfo,
  //     emergencycontactnumber: JSON.stringify(emerformData),
  //     doctor_information: JSON.stringify(drformData),
  //     WaiverRelease_url: JSON.stringify(initials),
  //     HoldHarmlessAgreement_url: JSON.stringify(harmlessagreement),
  //     id_url: null,
  //     count: count,
  //     brief_description: JSON.stringify(description),
  //     ArtistPiercerNames: null,
  //   });
  // } else {
  //   data = JSON.stringify({
  //     username: username,
  //     minor: minor,
  //     typeofservice: user.selectedTattooType,
  //     firstname: sessionStorage.getItem("firstname"),
  //     lastname: sessionStorage.getItem("lastname"),
  //     body_location: JSON.stringify(finalUser),
  //     medicalhistory: JSON.stringify(formData),
  //     emergencycontactnumber: JSON.stringify(emerformData),
  //     doctor_information: JSON.stringify(drformData),
  //     WaiverRelease_url: JSON.stringify(initials),
  //     HoldHarmlessAgreement_url: JSON.stringify(harmlessagreement),
  //     id_url: null,
  //     count: count,
  //     brief_description: JSON.stringify(description),
  //     ArtistPiercerNames: null,
  //   });
  // }
  //   try {
  //     const response = await fetch(`${apiUrl}appointment/post`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: data,
  //     });
  //     const responseData = await response.json();
  //     if (response.status === 201) {
  //       sessionStorage.setItem("appointmentID", responseData.userData.id);
  //       sessionStorage.setItem(
  //         "appointment_detail",
  //         JSON.stringify(responseData.userData)
  //       );
  //       setLoading(false);
  //       navigate("/verify");
  //       return;
  //     } else {
  //       setLoading(false);
  //       setAlertMessage(t("Please fill in all the required fields"));
  //       setAlert(!alert);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Error:", error);
  //   }
  // };

  const handleCheckbox = (e) => {
    if (e.target.checked === true) {
      setInitials((prev) => ({ ...prev, [currentPage]: storedInitials }));
    }
    if (e.target.checked === false) {
      setInitials((prev) => ({ ...prev, [currentPage]: "" }));
    }
  };

  const handleGaurdianCheckbox = (e) => {
    if (e.target.checked === true) {
      setGaurdianInitials((prev) => ({
        ...prev,
        [currentPage]: storedGaurdianInitials,
      }));
    }
    if (e.target.checked === false) {
      setGaurdianInitials((prev) => ({ ...prev, [currentPage]: "" }));
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
          <div className="flex  justify-between items-center gap-2 md:w-3/4 lg:w-2/4 mx-auto w-full">
            <label className="text-white text-sm md:text-base flex gap-2 items-center hover:cursor-pointer">
              <input
                type="checkbox"
                className="w-6 h-6"
                checked={initials[currentPage]}
                onChange={handleCheckbox}
              ></input>
              {t("Select to add your initials")}
            </label>
            <input
              type="text"
              value={initials[currentPage] || ""}
              disabled
              // onChange={(e) => handleInitialsChange(currentPage, e.target.value)}
              className="bg-gray-700 text-white p-2 rounded-md w-20 Blacksword"
            />
          </div>

          {minor === "true" && (
            <div className="flex  justify-between items-center gap-2 md:w-3/4 lg:w-2/4 mx-auto w-full">
              <label className="text-white text-sm md:text-base flex gap-2 items-center hover:cursor-pointer">
                <input
                  type="checkbox"
                  className="w-6 h-6"
                  checked={gaurdianInitials[currentPage]}
                  onChange={handleGaurdianCheckbox}
                ></input>
                {t("Select to add gaurdian's initials")}
              </label>
              <input
                type="text"
                value={gaurdianInitials[currentPage] || ""}
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
