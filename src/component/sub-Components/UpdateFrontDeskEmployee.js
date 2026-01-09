import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppointmentContext } from "../../context/AppointmentContext";
import { useState } from "react";
import axiosInstance from "../../config/axios";
import toast from "react-hot-toast";


const UpdateFrontDeskEmployee = ({step , setStep, loading, setLoading,finalAlert, setFinalAlert }) => {
    const { t } = useTranslation();
    const { appointment, setAppointment } = useAppointmentContext();
    const [frontDeskEmployee, setFrontDeskEmployee] = useState(appointment.frontDeskEmployee || "");
    const [ artists, setArtists ] = useState([])
    
    useEffect(()=>{
     const fetchEmployees = async()=>{
        try {
            const res = await axiosInstance.get("employee")
            if(res.status === 200){
                const employees = res.data.employees;
                const employeeNames = employees.map(emp => `${emp.firstName} ${emp.lastName}`);
                setArtists(employeeNames);
            }
        } catch (error) {
            toast.error("Failed to fetch employees")
        }
     }
     fetchEmployees();
    },[])


    const handleFrontDesk = async () => {
   if (!frontDeskEmployee) {
      toast.error("Please select a frontdesk Employee name");
      return 
    }
    const updates = {
      frontDeskEmployee
    }
    try {
      setLoading(true)
      const response = await axiosInstance.put(`appointment/${appointment.id}`, updates)
      if(response.status === 200){
        setAppointment(response.data.appointment)
        setFinalAlert(!finalAlert)
        return
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong")
    }finally{
      setLoading(false)
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-between items-center  overflow-auto p-8 text-white">
          <div className="w-full h-full flex flex-col gap-3 items-center  overflow-auto p-8 text-white">
            <label className="text-white font-bold md:text-3xl text-lg">
              {t("Select Employee Name")}
            </label>
            <select
              className="p-2 rounded-xl md:w-1/4 w-full text-black font-semibold"
              value={frontDeskEmployee}
              onChange={(e) => setFrontDeskEmployee(e.target.value)}
            >
              <option value={""}>Select Employee Name</option>
              {artists.map((employee) => (
                <option key={employee.id} className="capitalize" value={employee}>
                  {employee}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 flex justify-between">
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold text-black"
              onClick={() => setStep(4)}
            >
              {t("Back")}
            </button>
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold text-black"
              onClick={handleFrontDesk}
            >
              {t("Submit")}
            </button>
          </div>
        </div>
  )
}

export default UpdateFrontDeskEmployee
