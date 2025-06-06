import { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import InputButton from "../buttons/InputButton";
import { AUTHHEADERS } from "../../commonFunctions/Headers";
import axios from "axios";
import { apiUrl } from "../../url";
import { useTranslation } from "react-i18next";
import UserContext from "../../context/UserContext";
import LoaderModal from "../modal/LoaderModal";

const UploadFL = ({setStep, step}) => {
  const [flPrev, setFlPrev] = useState();
  const {t} = useTranslation()
  const {setAlert, alert, setAlertMessage} = useContext(UserContext)
  const [loading, setLoading]  = useState(false)
  const [flIDPhoto, setFlIDPhoto] = useState(null);
  const [flLoading, setFlLoading] = useState(false);
  const appointmentID = sessionStorage.getItem("appointmentID")


  const uploadFLData = async () => {
    setLoading(true)
    if (!flIDPhoto) {
      setAlertMessage(t("Please upload FL Consent Form"));
      setAlert(!alert);
      return;
    }
    let fldata = {
      updates: [
        {
          id: appointmentID,
          updateField: "fl_form",
          updateValue: flIDPhoto,
        },
      ],
    };
    await axios.post(`${apiUrl}artist/post_new`, fldata , {headers : AUTHHEADERS()})
    .then(res=>{
        if(res.status === 201){
         axios.get(`${apiUrl}artist/appointment_list_id_user?id=${appointmentID}`, {headers:AUTHHEADERS()})
         .then(response=>{
           sessionStorage.setItem("appointment_detail", JSON.stringify(response?.data?.data[0]))
              setStep(4)
             })
            }
        })
    .catch(err=>{
        setAlertMessage(t("Please upload FL Consent Form"));
        setAlert(!alert);
    }).finally(()=>{
      setFlLoading(false)
    })
  };

  const handleFLDelete = () => {
    setFlPrev(null);
  };

  const handleFLPhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFlLoading(true);
      const url = URL.createObjectURL(file);
      setFlPrev(url);
      const formData = new FormData();
      formData.append("profile", file);
      await axios
        .post(`${apiUrl}upload`, formData, { headers: AUTHHEADERS() })
        .then((res) => {
          if (res.data.profile_url) {
            setFlIDPhoto(res.data.profile_url);
            setFlLoading(false);
          }
        })
        .catch((err) => {
          setFlLoading(false);
        });
    }
  };

  const handlePrev = ()=>{
    setStep(2)
  }

  {
    if(loading) return <LoaderModal/>
  }

  return (
    <>
     
    <div className="w-full h-full flex flex-col justify-between items-center overflow-auto bg-black p-8 text-white">

    <div className="w-full h-full flex flex-col gap-3 items-center overflow-auto bg-black p-8 text-white">
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        {" "}
        {t("FL Consent Form")}
      </h1>
      {flPrev && (
        <div className="relative md:w-1/4 w-full">
          <img src={flPrev} className="w-full" alt="ID Photo" />
          <IoMdClose
            className="absolute right-2 top-2 hover:cursor-pointer"
            onClick={handleFLDelete}
            />
        </div>
      )}

        <InputButton
          onChange={handleFLPhotoUpload}
          loading={flLoading}
          text={"Upload FL form"}
          />

        <p className="text-center">
          {"Please upload FL Health Department Consent Form"}
        </p>

            </div>
        <div className='w-full md:w-1/2 flex justify-between'>
       <button
      onClick={handlePrev}
      className="yellowButton px-4 py-2 font-bold rounded-3xl text-black"
      >
      {t("Back")}
      </button>

      <button
      onClick={uploadFLData}
      disabled={!flIDPhoto}
      className="yellowButton px-4 py-2 font-bold rounded-3xl text-black"
      >
      {t("Submit")}
      </button>
          </div>
    
    </div>
          </>
  );
};

export default UploadFL;
