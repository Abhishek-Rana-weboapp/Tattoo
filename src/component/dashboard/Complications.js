import React, { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MedicalFormLayout from '../Layout/MedicalFormLayout'
import UserContext from '../../context/UserContext'
import axios from 'axios'
import { apiUrl } from '../../url'
import { useNavigate } from 'react-router-dom'
import LoaderModal from '../modal/LoaderModal'

const Complications = ({updateAppointment,setUpdateAppointment,handlePrev}) => {
    const {t} = useTranslation()
    const textRef = useRef(null)
    const [yes, setYes] = useState(false)
    const [no, setNo] = useState(false)
    const [inputData, setInputData] = useState("")
    const {alert, setAlertMessage, setAlert} = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        if(updateAppointment.complication !== null){
          if(updateAppointment.complication === "no"){
            setNo(true)
          }else{
            setYes(true)
            setInputData(updateAppointment.complication)
          }
        }
    },[])
    
    const handleRadioButtons = (e)=>{
    if(e.target.value === "yes"){
        setYes(true)
        setNo(false)
    }
    if(e.target.value === "no"){
        setYes(false)
        setNo(true)
    }
    }

    const nextPage = async()=>{
        setLoading(true)
    let data
      if(yes){
        if(inputData){
            data = {
                updates :[
                    {
                        id:updateAppointment?.id,
                        updateField:"complication",
                        updateValue:inputData
                    },
                    {
                        id: updateAppointment?.id,
                        updateField: "process_step",
                        updateValue: 7,
                      },
                ]
            }   
        }else{
          setLoading(false)
            setAlertMessage(t( "Please enter explanation")) 
            setAlert(!alert)
            
            return
        }
      }if(no){
        data = {
            updates :[
                {
                    id:updateAppointment?.id,
                    updateField:"complication",
                    updateValue:"no"
                },
                {
                    id: updateAppointment?.id,
                    updateField: "process_step",
                    updateValue: 7,
                  },
            ]
        }
      }
   if(data){
       await axios.post(`${apiUrl}/artist/post_new`, data)
       .then((response) => {
           axios
           .get(
               `${apiUrl}/artist/appointment_list_id?id=${updateAppointment?.id}`
               )
               .then((res) => {
                   setUpdateAppointment(res.data.data[0]);
                   navigate(
                       `/billing/${updateAppointment?.id}/${res.data.data[0].process_step}`
                       );
                    })
                    .catch((err) => {
                        setLoading(false);
                        setAlert(!alert);
                        setAlertMessage(t("Something went wrong"));
                    });
                })
                .catch((err) => {
                    setLoading(false);
                    setAlert(!alert);
                    setAlertMessage(t("Something went wrong"));
                });
            }else{
                setLoading(false)
            }
    }
    if(loading){
        return <LoaderModal/>
    }
            
            return (
                <MedicalFormLayout>

    <div className="flex flex-col items-center gap-4 w-full h-full flex-1">
          <div className="flex flex-col items-center gap-4 w-full flex-1 p-2">

          <label className="uppercase text-white text-center md:text-2xl text-md md:font-bold flex gap-1">
            <span>
              {t("During the service we provided were there any complications between you, the client, or any other member of Fame Tattoos Staff? Example: (fainting, contamination, unable to fulfill service, argument, or misunderstanding)")}
            </span>
          </label>
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 justify-start flex gap-2 items-center">
              <input
                type="checkbox"
                className=" w-6 h-6"
                name="page5"
                value="yes"
                checked={yes}
                onChange={handleRadioButtons}
              />
              <label className="text-2xl uppercase text-white">{t("Yes")}</label>
            </div>
            <div className="w-20 justify-start flex gap-2 items-center">
              <input
                type="checkbox"
                className=" w-6 h-6"
                name="page5"
                value="no"
                checked={no}
                onChange={handleRadioButtons}
                />
              <label className="text-2xl uppercase text-white">NO</label>
            </div>
          </div>

          {yes && <div className="flex-col  flex gap-2 items-center w-full">
            <label className="text-lg uppercase text-white">
            {t("PLEASE EXPLAIN")}
            </label>
            <textarea
            ref={textRef}
            type="text"
            name="page5-explanation"
            placeholder='Explain'
            className="w-full p-2 rounded-lg focus:outline-yellow-500 text-black"
            value={inputData}
            onChange={e=>setInputData(e.target.value)}
            />
          </div>}
            </div>
          <div className=" w-full flex justify-between">
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2 text-black"
              onClick={handlePrev}
            >
              {t('Prev')}
            </button>
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2 text-black"
              onClick={nextPage}
            >
             {t('Next')}
            </button>
          </div>
        </div>

    
                </MedicalFormLayout>
  )
}

export default Complications
