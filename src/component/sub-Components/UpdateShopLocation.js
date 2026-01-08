
import { useState } from 'react';
import { useAppointmentContext } from '../../context/AppointmentContext';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import axiosInstance from '../../config/axios';
import toast from 'react-hot-toast';

const UpdateShopLocation = ({step ,setStep , loading, setLoading}) => {
    const { t } = useTranslation();
    const { appointment, setAppointment } = useAppointmentContext();
    const [shopLocation, setShopLocation] = useState(appointment.shopLocation || "Hialeah, Fl");
    const [ shopLocationOptions, setShopLocationOptions ] = useState([]);

    useEffect(()=>{
        const fetchShopLocations = async () => {
            try {
                const response = await axiosInstance.get('shoplocation');
                if(response.status === 200){
                    setShopLocationOptions(response.data.shoplocations.map(loc => loc.shoplocation));
                }
            } catch (error) {
                toast.error("Failed to fetch shop locations");
                console.error(error);
            }
        }

        fetchShopLocations();
    },[])

    const handleShopLocation = async () => {
    if (!shopLocation) {
      toast.error("Please select a shop location");
      return 
    }
    const updates = {
      shopLocation
    }
    try {
      setLoading(true)
      const response = await axiosInstance.put(`appointment/${appointment.id}`, updates)
      if(response.status === 200){
        setAppointment(response.data.appointment)
        setStep(5)
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
                  {t("Select Shop Location")}
                </label>
                <select
                  className="p-2 rounded-xl md:w-1/4 w-full text-black font-semibold"
                  value={shopLocation}
                  onChange={(e) => setShopLocation(e.target.value)}
                >
                    <option value="">Select Shop Location</option>
                  {shopLocationOptions.map((state) => {
                    return (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="w-full md:w-1/2 flex justify-between">
                <button
                  className="yellowButton py-2 px-4 rounded-3xl font-bold text-black"
                  onClick={() =>
                    appointment.typeofservice === "tattoo" && appointment.minor
                      ? setStep(3)
                      : setStep(2)
                  }
                >
                  {t("Back")}
                </button>
                <button
                  className="yellowButton py-2 px-4 rounded-3xl font-bold text-black"
                  onClick={handleShopLocation}
                >
                  {t("Submit")}
                </button>
              </div>
            </div>
  )
}

export default UpdateShopLocation
