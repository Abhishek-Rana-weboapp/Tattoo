import {useEffect, useState } from "react";
import { apiUrl } from "../../url";
import LoaderModal from "../modal/LoaderModal";
import { IoMdClose } from "react-icons/io";
import InputButton from "../buttons/InputButton";
import Modal from "../modal/Modal";
import { useAppointmentContext } from "../../context/AppointmentContext";
import { useAuthContext } from "../../context/AuthContext";
import TranslationWrapper from "../Layout/TranslationWrapper";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axios";

export default function VerifyUpload({ step, setStep }) {
  const { appointment, setAppointment } = useAppointmentContext();
  const { user } = useAuthContext();
  const [clientId, setClientId] = useState("");
  const [clientIdUploading, setClientIdUploading] = useState(false);
  const [guardianId, setGuardianId] = useState("");
  const [guardianIdUploading, setGuardianIdUploading] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
     (async()=>{
      setLoading(true)
      try {
        const response = await axiosInstance.get("identity/latest_identity")
        if(response.status === 200){
          if(response.data.identity){
            setClientId(response.data.identity.clientId);
            setGuardianId(response.data.identity.guardianId)
             setUpdateModal(true)
          }
        }
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.error || "Something went wrong while fetching the uploaded identity")
      }finally{
            setLoading(false)
      }
     })()
  },[])


  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a file");
      return;
    }
    const name = e.target.name;
    const formData = new FormData();
    if (name === "client") {
      setClientIdUploading(true);
    }
    if (name === "guardian") {
      setGuardianIdUploading(true);
    }
    formData.append("profiles", file);
    try {
      const response = await axiosInstance.post("upload", formData);
      if (response.status === 200) {
        if(name === "client"){
          setClientId(response.data.profile_urls[0])
        }else{
          setGuardianId(response.data.profile_urls[0])
        }
      }
    } catch (error) {
      toast.error("Failed to upload ID");
      console.log(error)
    } finally {
      setClientIdUploading(false);
      setGuardianIdUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!clientId) {
      toast.error("Client ID is required");
      return;
    }
    if (user.minor && !guardianId) {
      toast.error("Guardian ID is required");
      return;
    }

    let updates = {
      clientId,
    };
    if (user.minor) {
      updates.guardianId = guardianId;
    }

    try {
      setLoading(true)
      const response = await axiosInstance.put(`appointment/${appointment.id}`, updates)
      if(response.status === 200){
        setAppointment(response.data.appointment)
        if(user.minor){
          if(appointment.typeofservice === "tattoo" || appointment.typeofservice === "piercing"){
            setStep(3);
            return
          }
          setStep(4)
        }else{
          setStep(4)
        }
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong")
    }finally{
      setLoading(false)
    }
  };


  const handleClientDelete = () => {
    setClientId("");
  };

  const handleGaurdianDelete = () => {
    setGuardianId("");
  };

  const handlePrev = () => {
    setStep(1);
  };

  if(loading){
    return <LoaderModal/>
  }

  

  const handleNo = async() => {
    let updates ={
      clientId
    };
    if(user.minor){
      updates.guardianId = guardianId
    }
    try {
      setLoading(true)
      const response = await axiosInstance.put(`/appointment/${appointment.id}`, updates)
      if(response.status === 200){
        if(user.minor){
          if(appointment.typeofservice === "tattoo" || appointment.typeofservice === "piercing"){
            setStep(3);
            return
          }
          setStep(4)
        }else{
          setStep(4)
        }
      }
    } catch (error) {
      console.log(error)
       toast.error(error.response.data.message || "Something went wrong")
    }finally{
      setLoading(false)
    }
    setUpdateModal(false);
  };

  const handleYes = () => {
    setUpdateModal(false);
  };

  return (
    <>
      {updateModal && (
        <Modal>
          <p className="text-3xl font-bold mb-4 text-black">
            <TranslationWrapper text={"Do you want to update your ID?"} />
          </p>
          <div className="flex  gap-5 items-center">
            <button
              className="yellowButton text-black py-2 px-8 rounded-3xl font-bold mt-4"
              onClick={handleYes}
            >
              <TranslationWrapper text={"Yes"} />
            </button>
            <button
              className="yellowButton text-black py-2 px-8 rounded-3xl font-bold mt-4"
              onClick={handleNo}
            >
              <TranslationWrapper text={"No"} />
            </button>
          </div>
        </Modal>
      )}

      {/* Client Section */}
      <div className="w-full h-full flex flex-col justify-between items-center overflow-auto bg-black p-8 text-white">
        <div className="w-full h-full flex flex-col gap-3 items-center overflow-auto bg-black p-8 text-white">
          <h1 className="md:text-2xl uppercase text-lg font-bold">
            {" "}
            <TranslationWrapper text={"ID Verification"} />
          </h1>

          <h2 className="md:text-xl font-semibold">
            {" "}
            <TranslationWrapper text={"ID should be either an image(.jpg /.png) or pdf"} />
          </h2>

          {clientId && (
            <div className="relative md:w-1/4 w-full">
              <img
                src={`${apiUrl}${clientId}`}
                className="w-full"
                alt="client ID"
              />
              <IoMdClose
                className="absolute right-2 top-2 hover:cursor-pointer"
                onClick={handleClientDelete}
              />
            </div>
          )}

          <InputButton
            onChange={handleUpload}
            name="client"
            loading={clientIdUploading}
            text={"Upload ID Photo"}
          />

          {/* Guardian Section  */}
          {user.minor && (
            <>
              {guardianId && (
                <div className="relative md:w-1/4 w-full">
                  <img
                    src={`${apiUrl}${guardianId}`}
                    className="w-full"
                    alt="guardian ID"
                  />
                  <IoMdClose
                    className="absolute right-2 top-2 hover:cursor-pointer"
                    onClick={handleGaurdianDelete}
                  />
                </div>
              )}
              <InputButton
                onChange={handleUpload}
                name="guardian"
                loading={guardianIdUploading}
                text={"Upload Guardian's ID"}
              />
            </>
          )}
        </div>

        <div className="w-full md:w-1/2 flex justify-between">
          <button
            onClick={handlePrev}
            className="yellowButton px-4 py-2 font-bold rounded-3xl text-black"
          >
            <TranslationWrapper text={"Back"} />
          </button>

          <button
            onClick={handleSubmit}
            className="yellowButton px-4 py-2 font-bold rounded-3xl text-black"
          >
            <TranslationWrapper text={"Submit"} />
          </button>
        </div>
      </div>
    </>
  );
}

