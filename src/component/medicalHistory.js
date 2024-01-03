import React, { useState, useContext, useEffect, useRef } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import MedicalFormLayout from "./Layout/MedicalFormLayout";
import Modal from "./modal/Modal";
import { useTranslation } from 'react-i18next';

function MedicalForm() {
  const { t } = useTranslation();
  var progressValue = 50;
  const [progressValue_, setprogressValue_] = useState(1);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const { user, selectedPattern, formData, setFormData , alert, setAlert , setAlertMessage } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup_, setShowPopup_] = useState(false);

  const yes=t("YES")
  const No=t('No')
  const options = [yes,No];
  const [data, setdata] = useState();

  const textRef = useRef()

  const fetchData = async () => {
    const username = sessionStorage.getItem("username");
    try {
      const response = await fetch(
        `${apiUrl}/artist/username_appointment_list?username=${username}`
      );
      const data = await response.json();

      if (data.data.length > 0) {
        //console.log("have medical history :",data.data[data.data.length-1])
        setdata(data.medicalhistory);
        setShowPopup_(true);
      }
    } catch (error) {
      console.error("Error fetching previous medical history:", error);
    }
  };

  useEffect(()=>{
    if(formData?.page3?.yes || formData?.page4?.yes || formData?.page5?.yes || formData?.page6?.yes || formData?.page7?.yes || formData?.page8?.yes){
      textRef?.current?.focus()
    }
  },[formData])

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdatedata = (value) => {
    setShowPopup_(false)
    if (value === "No") {
      setFormData({
        page1: data?.tattooedBefore,
        page2: data?.pregnantOrNursing,
        page3: data?.hemophiliac,
        page4: data?.medicalCondition,
        page5: data?.communicableDiseases,
        page6: data?.alcohol,
        page7: data?.allergies,
        page8: data?.heartCondition,
      });
      navigate("/emergency-contact");
    }
    if (value === "Yes") {
      setShowPopup_(!showPopup_);
    }
  };

  useEffect(() => {
    if (
      user.selectedTattooType !== null ||
      user.tattooLocation !== null ||
      user.piercingLocation !== null ||
      user.selectedPattern !== null
    ) {
      setShowPopup(true);
    }
  }, [user.selectedTattooType, user.tattooLocation]);

  const handleInputChange = (page, option, value) => {
    setFormData({
      ...formData,
      [page]: { ...formData[page], [option]: value },
    });
  };

  const handleRadioButtons = (e, page) => {
    if (e.target.value === "yes") {
      setFormData({
        ...formData,
        [page]: { ...formData[page], yes: true, no: false },
      });
    }
    if (e.target.value === "no") {
      setFormData({
        ...formData,
        [page]: { ...formData[page], yes: false, no: true },
      });
      if (Object.keys(formData[page]).includes("explanation")) {
        setFormData({
          ...formData,
          [page]: { ...formData[page], yes: false, no: true, explanation: "" },
        });
      }
      if (Object.keys(formData[page]).includes("pregnant" || "nursing")) {
        setFormData({
          ...formData,
          [page]: {
            ...formData[page],
            yes: false,
            no: true,
            pregnant: false,
            nursing: false,
          },
        });
      }
    }
  };

  const handleCheckBoxes = (e, page) => {
    if (e.target.value === "pregnant") {
      setFormData({
        ...formData,
        [page]: { ...formData[page], pregnant: true, nursing: false },
      });
    }
    if (e.target.value === "nursing") {
      setFormData({
        ...formData,
        [page]: { ...formData[page], pregnant: false, nursing: true },
      });
    }
  };

  const nextPage = () => {
    const currentPageData = formData[`page${currentPage}`];
    if (currentPageData.yes) {
      if (currentPage === 1) {
        setprogressValue_(progressValue_ + 1);
        setCurrentPage(currentPage + 1);
      }
      if (currentPage === 2) {
        if (currentPageData.pregnant || currentPageData.nursing) {
          setprogressValue_(progressValue_ + 1);
          setCurrentPage(currentPage + 1);
        } else {
          setAlert(!alert)
          setAlertMessage(t("Please Select an option"));
        }
      } else if (currentPage !== 1 && currentPage !== 2) {
        if (currentPageData.explanation) {
          setprogressValue_(progressValue_ + 1);
          setCurrentPage(currentPage + 1);
          if (currentPage === 8) {
            navigate("/emergency-contact");
          }
        } else {
          setAlert(!alert)
          setAlertMessage(t("Please enter the explanation"));
        }
      }
    }
    if (currentPageData.no) {
      setprogressValue_(progressValue_ + 1);
      setCurrentPage(currentPage + 1);
      if (currentPage === 8) {
        navigate("/emergency-contact");
      }
    } else if (!currentPageData.no && !currentPageData.yes) {
      // Show an alert message if the user doesn't select a choice
      setAlert(!alert)
      setAlertMessage("Please select an option");
    }
  };

  const prevPage = () => {
    setprogressValue_(progressValue_ - 1);
    setCurrentPage(currentPage - 1);
  };

  console.log(user);

  return (
    <>
    <MedicalFormLayout
      title={t("Medical history")}
      progressValue={progressValue}
      progressValue_={progressValue_}
      progressValue_count_={8}
    >
   

      {currentPage === 1 && (
        <div className="flex flex-col items-center gap-4 w-full h-full flex-1">
                    <div className="flex flex-col items-center gap-4 w-full flex-1 p-2">

          <label className="uppercase text-white md:text-2xl text-md md:font-bold">
            <span className="underline">{t("Q1")}</span>{t("HaveYouEverBeenTattooedBefore?")}
          </label>
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 justify-start flex gap-2 items-center">
              <input
                type="checkbox"
                className=" w-6 h-6"
                name="page1"
                value="yes"
                checked={formData?.page1?.yes}
                onChange={(e) => handleRadioButtons(e ,"page1")}
              />
              <label className="md:text-2xl text-lg uppercase text-white">{t("YES")}</label>
            </div>
            <div className="w-20 justify-start flex gap-2 items-center">
              <input
                type="checkbox"
                name="page1"
                className=" w-6 h-6"
                value="no"
                checked={formData?.page1?.no}
                onChange={(e) => handleRadioButtons(e ,"page1")}
              />
              <label className="md:text-2xl text-lg uppercase text-white">{t("NO")}</label>
            </div>
          </div>
                    </div>
          <ProgressBar progress={progressValue_} />
          <div className=" w-full flex justify-between">
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
              onClick={() => navigate(-1)}
            >
              {t("Prev")}
            </button>
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
              onClick={nextPage}
            >
              {t("Next")}
            </button>
          </div>
        </div>
      )}

      {/* Page 2 */}

      {currentPage === 2 && (
        <div className="flex flex-col items-center gap-4 w-full h-full flex-1">
          <div className="flex flex-col items-center gap-4 w-full flex-1 p-2">

          <label className="uppercase text-white md:text-2xl text-md md:font-bold">
            <span className="underline">{t("Q2")}</span>{t(": Are you Pregnant or Nursing?")}
          </label>
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 justify-start flex gap-2 items-center">
              <input
                type="checkbox"
                className=" w-6 h-6"
                name="page2"
                value="yes"
                checked={formData?.page2?.yes}
                onChange={(e) => handleRadioButtons(e, "page2")}
              />
              <label className="text-2xl uppercase text-white">{t("YES")}</label>
            </div>
            <div className="w-20 justify-start flex gap-2 items-center">
              <input
                type="checkbox"
                className=" w-6 h-6"
                name="page2"
                value="no"
                checked={formData?.page2?.no}
                onChange={(e) => handleRadioButtons(e, "page2")}
              />
              <label className="text-2xl uppercase text-white">{t("NO")}</label>
            </div>
          </div>

          <label className="text-white uppercase">{t("IF YES")} ,{t("PLEASE SELECT WHICH ONE")}</label>
          <div className="flex gap-10">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className=" w-6 h-6"
                name="page2-pregnant"
                value={"pregnant"}
                checked={formData?.page2?.pregnant}
                disabled={formData?.page2?.no}
                onChange={(e) => handleCheckBoxes(e, "page2")}
              />
              <label className="text-2xl uppercase text-white">{t("Pregnant")}</label>
              <input
                type="checkbox"
                className=" w-6 h-6"
                name="page2-nursing"
                value={"nursing"}
                checked={formData?.page2?.nursing}
                disabled={formData?.page2?.no}
                onChange={(e) => handleCheckBoxes(e, "page2")}
                />
              <label className="text-2xl uppercase text-white">{t("Nursing")}</label>
            </div>
          </div>
                </div>
          <ProgressBar progress={progressValue_} />
          <div className=" w-full flex justify-between">
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
              onClick={prevPage}
            >
              {t("Previous")}
            </button>
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
              onClick={nextPage}
            >
              {t("Next")}
            </button>
          </div>
        </div>
      )}

      {/* Page 3 */}

      {currentPage === 3 && (
        <>
          <div className="flex flex-col items-center gap-4 w-full h-full flex-1">
          <div className="flex flex-col items-center gap-4 w-full flex-1 p-2">

            <label className="uppercase text-white md:text-2xl text-md md:font-bold">
              <span className="underline">Q3</span>{t(": Are you a hemophiliac or on any medications that may cause bleeding or hinder blood clotting?")}
            </label>
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 justify-start flex gap-2 items-center">
                <input
                  type="checkbox"
                  className=" w-6 h-6"
                  name="page3"
                  value="yes"
                  checked={formData?.page3?.yes}
                  onChange={(e) => handleRadioButtons(e, "page3")}
                />
                <label className="text-2xl uppercase text-white">{t("YES")}</label>
              </div>
              <div className="w-20 justify-start flex gap-2 items-center">
                <input
                  type="checkbox"
                  className=" w-6 h-6"
                  name="page3"
                  value="no"
                  checked={formData?.page3?.no}
                  onChange={(e) => handleRadioButtons(e, "page3")}
                />
                <label className="text-2xl uppercase text-white">NO</label>
              </div>
            </div>

            <div className="flex-col flex gap-2 items-center w-full">
              <label className="text-lg uppercase text-white">
              {t("IF YES")},{t("PLEASE EXPLAIN")}
              </label>
              <textarea
                // type="text"
                ref={textRef}
                name="page3-explanation"
                className="w-full p-2 rounded-lg focus:outline-yellow-500"
                value={formData.page3.explanation}
                disabled={!formData?.page3?.yes ? true : false}
                onChange={(e) =>
                  handleInputChange("page3", "explanation", e.target.value)
                }
                />
            </div>
                </div>
            <ProgressBar progress={progressValue_} />
            <div className=" w-full flex justify-between">
              <button
                className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
                onClick={prevPage}
              >
                {t('Previous')}
              </button>
              <button
                className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
                onClick={nextPage}
              >
                {t('Next')}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Page 4 */}
      {currentPage === 4 && (
        <div className="flex flex-col items-center gap-4 w-full h-full flex-1">
          <div className="flex flex-col items-center gap-4 w-full flex-1 p-2">

          <label className="uppercase text-white md:text-2xl text-md md:font-bold">
            <span className="underline">Q4</span>{t(": Do you have any medical or skin conditions?")}
          </label>
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 justify-start flex gap-2 items-center">
              <input
                type="checkbox"
                className=" w-6 h-6"
                name="page4"
                value="yes"
                checked={formData?.page4?.yes}
                onChange={(e) => handleRadioButtons(e, "page4")}
                />
              <label className="text-2xl uppercase text-white">{t("YES")}</label>
            </div>
            <div className="w-20 justify-start flex gap-2 items-center">
              <input
                type="checkbox"
                className=" w-6 h-6"
                name="page4"
                value="no"
                checked={formData?.page4?.no}
                onChange={(e) => handleRadioButtons(e, "page4")}
                />
              <label className="text-2xl uppercase text-white">NO</label>
            </div>
          </div>

          <div className="flex-col flex gap-2 items-center w-full">
            <label className="text-lg uppercase text-white">
            {t("IF YES")},{t("PLEASE EXPLAIN")}
            </label>
            <textarea
            ref={textRef}
              // type="text"
              name="page4-explanation"
              className="w-full p-2 rounded-lg focus:outline-yellow-500"
              disabled={!formData?.page4?.yes ? true : false}
              value={formData?.page4?.explanation}
              onChange={(e) =>
                handleInputChange("page4", "explanation", e.target.value)
              }
              />
          </div>
              </div>
          <ProgressBar progress={progressValue_} />
          <div className=" w-full flex justify-between">
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
              onClick={prevPage}
            >
              {t('Previous')}
            </button>
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
              onClick={nextPage}
            >
              {t('Next')}
            </button>
          </div>
        </div>
      )}

      {/* Page 5 */}
      {currentPage === 5 && (
        <div className="flex flex-col items-center gap-4 w-full h-full flex-1">
          <div className="flex flex-col items-center gap-4 w-full flex-1 p-2">

          <label className="uppercase text-white md:text-2xl text-md md:font-bold flex gap-1">
            <span className="underline">Q5 </span> 
            <span>
              {t(": Do you have any communicable diseases?")}
            </span>
          </label>
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 justify-start flex gap-2 items-center">
              <input
                type="checkbox"
                className=" w-6 h-6"
                name="page5"
                value="yes"
                checked={formData?.page5?.yes}
                onChange={(e) => handleRadioButtons(e, "page5")}
              />
              <label className="text-2xl uppercase text-white">{t("YES")}</label>
            </div>
            <div className="w-20 justify-start flex gap-2 items-center">
              <input
                type="checkbox"
                className=" w-6 h-6"
                name="page5"
                value="no"
                checked={formData?.page5?.no}
                onChange={(e) => handleRadioButtons(e, "page5")}
                />
              <label className="text-2xl uppercase text-white">NO</label>
            </div>
          </div>

          <div className="flex-col  flex gap-2 items-center w-full">
            <label className="text-lg uppercase text-white">
            {t("IF YES")},{t("PLEASE EXPLAIN")}
            </label>
            <textarea
            ref={textRef}
            type="text"
            name="page5-explanation"
            className="w-full p-2 rounded-lg focus:outline-yellow-500"
            disabled={!formData?.page5?.yes ? true : false}
            value={formData?.page5?.explanation}
            onChange={(e) =>
              handleInputChange("page5", "explanation", e.target.value)
            }
            />
          </div>
            </div>
          <ProgressBar progress={progressValue_} />
          <div className=" w-full flex justify-between">
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
              onClick={prevPage}
            >
              {t('Previous')}
            </button>
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
              onClick={nextPage}
            >
             {t('Next')}
            </button>
          </div>
        </div>
      )}

      {/* Page 6 */}
      {currentPage === 6 && (
        <div className="flex flex-col items-center gap-4 w-full h-full flex-1">
          <div className="flex flex-col items-center gap-4 w-full flex-1 p-2">

          <label className="uppercase text-white flex gap-2 md:text-2xl text-lg md:font-bold">
            <span className="underline">Q6</span>
            <span>{t(": Are you under the influence of alcohol or drugs, prescribed or otherwise?")}
            </span>
          </label>
          <div className="flex flex-col items-center  gap-4">
            <div className="w-20 justify-start flex gap-2 items-center">
              <input
                type="checkbox"
                className=" w-6 h-6"
                name="page6"
                value="yes"
                checked={formData?.page6?.yes}
                onChange={(e) => handleRadioButtons(e, "page6")}
              />
              <label className="text-2xl uppercase text-white">{t("YES")}</label>
            </div>
            <div className="w-20 justify-start flex gap-2 items-center">
              <input
                type="checkbox"
                className=" w-6 h-6"
                name="page6"
                value="no"
                checked={formData?.page6?.no}
                onChange={(e) => handleRadioButtons(e, "page6")}
                />
              <label className="text-2xl uppercase text-white">NO</label>
            </div>
          </div>

          <div className="flex-col flex gap-2 items-center w-full">
            <label className="text-lg uppercase text-white">
            {t("IF YES")},{t("PLEASE EXPLAIN")}
            </label>
            <textarea
            ref={textRef}
            type="text"
            className="w-full p-2 rounded-lg focus:outline-yellow-500"
            name="page6-explanation"
            disabled={!formData?.page6?.yes ? true : false}
            value={formData?.page6?.explanation}
            onChange={(e) =>
              handleInputChange("page6", "explanation", e.target.value)
              }
              />
          </div>
              </div>
          <ProgressBar progress={progressValue_} />
          <div className=" w-full flex justify-between">
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
              onClick={prevPage}
            >
              {t('Previous')}
            </button>
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
              onClick={nextPage}
            >
              {t('Next')}
            </button>
          </div>
        </div>
      )}

      {/* Page 7 */}
      {currentPage === 7 && (
        <div className="flex flex-col items-center gap-4 w-full h-full flex-1">
          <div className="flex flex-col items-center gap-4 w-full flex-1 p-2">

          <label className="uppercase text-white flex gap-2 md:text-2xl text-lg md:font-bold">
            <span className="underline">Q7</span>
            <span>{t(": Do you have any allergies?")}</span>
          </label>
          <div className="flex flex-col items-center  gap-4">
            <div className="w-20 justify-start flex gap-2 items-center">
              <input
                type="checkbox"
                className=" w-6 h-6"
                name="page7"
                value="yes"
                checked={formData?.page7?.yes}
                onChange={(e) => handleRadioButtons(e, "page7")}
                />
              <label className="text-2xl uppercase text-white">{t("YES")}</label>
            </div>
            <div className="w-20 justify-start flex gap-2 items-center">
              <input
                type="checkbox"
                className=" w-6 h-6"
                name="page7"
                value="no"
                checked={formData?.page7?.no}
                onChange={(e) => handleRadioButtons(e, "page7")}
              />
              <label className="text-2xl uppercase text-white">NO</label>
            </div>
          </div>
          <div className="flex-col flex gap-2 items-center w-full">
            <label className="text-lg uppercase text-white">
              {t("IF YES")},{t("PLEASE EXPLAIN")}
            </label>
            <textarea
            ref={textRef}
            type="text"
            className="w-full p-2 rounded-lg focus:outline-yellow-500"
              name="page7-explanation"
              disabled={!formData?.page7?.yes ? true : false}
              value={formData?.page7?.explanation}
              onChange={(e) =>
                handleInputChange("page7", "explanation", e.target.value)
              }
            />
          </div>
            </div>
          <ProgressBar progress={progressValue_} />
          <div className=" w-full flex justify-between">
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
              onClick={prevPage}
            >
              {t('Previous')}
            </button>
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
              onClick={nextPage}
            >
              {t('Next')}
            </button>
          </div>
        </div>
      )}

      {/* Page 8 */}
      {currentPage === 8 && (
        <div className="flex flex-col items-center gap-4 w-full h-full flex-1">
          <div className="flex flex-col items-center gap-4 w-full flex-1 p-2">

          <label className="uppercase text-white flex gap-2 md:text-2xl text-lg md:font-bold">
            <span className="underline">Q8:</span>
            <span>{t(": Do you have a heart condition, epilepsy, or diabetes?")}</span>
          </label>
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 justify-start flex gap-2 items-center">
              <input
                type="checkbox"
                className=" w-6 h-6"
                name="page8"
                value="yes"
                checked={formData?.page8?.yes}
                onChange={(e) => handleRadioButtons(e, "page8")}
              />
              <label className="text-2xl uppercase text-white">{t("YES")}</label>
            </div>
            <div className="w-20 justify-start flex gap-2 items-center">
              <input
                type="checkbox"
                className=" w-6 h-6"
                name="page8"
                value="no"
                checked={formData?.page8?.no}
                onChange={(e) => handleRadioButtons(e, "page8")}
              />
              <label className="text-2xl uppercase text-white">NO</label>
            </div>
          </div>
          <div className="flex-col flex gap-2 items-center w-full">
            <label className="text-lg uppercase text-white">
            {t("IF YES")},{t("PLEASE EXPLAIN")}
            </label>
            <textarea
            ref={textRef}
            type="text"
            name="page8-explanation"
            className="w-full p-2 rounded-lg focus:outline-yellow-500"
            disabled={!formData?.page8?.yes ? true : false}
            value={formData?.page8?.explanation}
            onChange={(e) =>
              handleInputChange("page8", "explanation", e.target.value)
              }
              />
          </div>
              </div>
          <ProgressBar progress={progressValue_} />
          <div className=" w-full flex justify-between">
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
              onClick={prevPage}
            >
              {t('Previous')}
            </button>
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
              onClick={nextPage}
            >
              {t('Next')}
            </button>
          </div>
        </div>
      )}
    </MedicalFormLayout>
      {showPopup_ && (
        <Modal>
          <h3 className="font-bold">{t("Do you want to update your medical history?")}</h3>

          {/* // Dropdown menu */}
          <div className="flex gap-1 items-center">
            <label className="text-xl font-bold">{t("Select an option:")}</label>
            <select
              className="rounded p-2 border-1 bg-black text-white"
              onChange={(e) => handleUpdatedata(e.target.value)}
            >
              <option value="">Select...</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button
            className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
            onClick={() => {
              setShowPopup_(false);
            }}
          >
            {t("Close Popup")}
          </button>
        </Modal>
      )}
    </>
  );
}
export default MedicalForm;
