import React, { useContext, useEffect, } from 'react'
import {  Route, Routes, useLocation,  } from 'react-router-dom'
import Login from '../component/login';
import SignUp from '../component/signup';
import ForgetPassword from '../component/forgetPassword';
import Resetpassword from '../component/resetPassword';
import Dashboard from '../component/dashboard';
import TattooDashboard from '../component/tatoodashboard/tatoodashboard'

import Piercing from '../component/piercingdashboard/piercingDashboard'
import EarPiercing from '../component/piercingdashboard/earPiercing'
import FacialPiercing from '../component/piercingdashboard/facialPiercing'
// import JweleryPiercing from '../component/piercingdashboard/facialPiercing'
import NosePiercing from '../component/piercingdashboard/nosePiercing'
import OralPiercing from '../component/piercingdashboard/oralPiercing'
import SurfacePiercing from '../component/piercingdashboard/surfacePiercing'
import VaginalPiercing from '../component/piercingdashboard/vaginalPiercing';
import ToothGem from '../component/toothGem';
import PermanentMakeup from '../component/permanentMakeup';
import HairLossPatternSelection from '../component/smp'
import EmergencyContactForm from '../component/emergency';
import DoctorContactForm from '../component/doctorInfo';
import ConsentForm from '../component/consent';
import HoldHarmlessAgreement from '../component/harmlessAgreement';
import TermsOfService from '../component/termofService';
// import UserContextProvider from '../context/UserContextProvider';
import ConsentFormGuard from '../component/consentForm';
import IDVerificationComponent from '../component/employeeVerfy';
import AdminDashboard from '../component/Admin';
import MedicalReview from '../component/medicalReview';
import PriceServices from '../component/priceServices';
import TattooComponent from '../component/serviceSelection';
import SkinCondition from '../component/skinCondition';
import AppointmentList from '../component/AppointmentList';
import JewelleryPiercing from '../component/piercingdashboard/jweleryPiercing';
import Title from "../assets/Title.png"
import UserContext from '../context/UserContext';
import PrivateRoutes from './PrivateRoutes';
import AlertModal from '../component/modal/AlertModal';
import ArtistDashboard from '../component/artistDashboard/ArtistDashboard';
import BillingComponent from '../component/billing';
import SuperAdminDashboard from '../component/artistDashboard/SuperAdminDashboard';
import AdminInvite from '../component/artistDashboard/AdminInvite';
import BriefDescription from '../component/tatoodashboard/BriefDescription';
import GaurdianInfo from '../component/GaurdianInfo';
import Complications from '../component/artistDashboard/Complications';
import TattooCount from '../component/TattooCount';
import NewMedicalHistory from '../component/medicalComponents/NewMedicalHistory';
import CustomerInfo from '../component/CustomerInfo';

export default function RoutesComponent() {

  const {isVisible, setIsVisible, alert, user, setUser, formData,setFormData,emerformData, setemerFormData,drformData, setdrFormData } = useContext(UserContext)
  const location = useLocation()

  useEffect(()=>{
    if(location.pathname === "/" || location.pathname === "/signup" || location.pathname === "/forget_password" ){
      setIsVisible(false)
    }else{
      setIsVisible(true)
    }
    const storedUser = JSON.parse(sessionStorage.getItem("user"))
    const storedMedicalHistory = sessionStorage.getItem("medicalHistory")
    const storedemerformData = sessionStorage.getItem("emerformData")
    const storeddrformData = sessionStorage.getItem("drformData")
    if(storedUser){
      setUser(storedUser)
    }
    if(storedMedicalHistory){
      setFormData(JSON.parse(storedMedicalHistory))
    }
    if(storedemerformData){
      setemerFormData(JSON.parse(storedemerformData))
    }
    if(storeddrformData){
      if(storeddrformData.name !== "" && storeddrformData.state !== "Florida"&& storeddrformData.city !== ""&& storeddrformData.phone !== ""){
        setdrFormData(JSON.parse(storeddrformData))
      }
    }
  const handleBeforeUnload = (event) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    if(Object.keys(formData).length > 0){
      sessionStorage.setItem("medicalHistory", JSON.stringify(formData))
    }
    sessionStorage.setItem("emerformData", JSON.stringify(emerformData))
    sessionStorage.setItem("drformData", JSON.stringify(drformData))
    event.preventDefault();
    // Chrome requires returnValue to be set
    event.returnValue = '';

    // Your logic here (e.g., showing a confirmation dialog)
    const message = 'Are you sure you want to leave?';
    event.returnValue = message; // For Chrome
    return message; // For other browsers
  };

  // Add the event listener when the component mounts
  window.addEventListener('beforeunload', handleBeforeUnload);

  // Remove the event listener when the component unmounts
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
 },[location])

  return (
    <>
      {
        alert && <AlertModal/>
       }
    {isVisible && <div className='flex justify-center'>
        <img src={Title} alt='logo' className='w-4/5 md:w-2/5'></img>
          </div>}
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />\
      <Route exact path="/forget_password" element={<ForgetPassword />} />
      <Route exact path="/reset_password" element={<Resetpassword/>} />
      <Route exact path="/invite_artist" element={<AdminInvite/>} />
      <Route exact path="/admin" element={<SuperAdminDashboard/>} />
      <Route element={<PrivateRoutes/>} >
      

      
      <Route exact path="/detailedinfo" element={<CustomerInfo />} />
      <Route exact path="/gaurdian-info" element={<GaurdianInfo />} />
      <Route exact path="/complication" element={<Complications />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/tattoo" element={<TattooDashboard />} />
      <Route exact path='/count' element={<TattooCount/>}/>

      <Route exact path="/description" element={<BriefDescription/>} />
      
      
      <Route exact path="/piercing" element={<Piercing />} />
      <Route exact path="/ear-piercing" element={<EarPiercing />} />
      <Route exact path="/facial-piercing" element={<FacialPiercing />} />
      <Route exact path="/jewelry-swap" element={<JewelleryPiercing />} />
      <Route exact path="/nose-piercing" element={<NosePiercing />} />
      <Route exact path="/oral-piercing" element={<OralPiercing />} />
      <Route exact path="/surface-piercing" element={<SurfacePiercing />} />
      <Route exact path="/vaginal-piercing" element={<VaginalPiercing />} />


      <Route exact path="/tooth-gems" element={<ToothGem />} />
      <Route exact path="/permanent-makeup" element={<PermanentMakeup />} />
      <Route exact path="/smp" element={<HairLossPatternSelection />} />
      <Route exact path="/medical-form" element={<NewMedicalHistory />} />
      <Route exact path="/emergency-contact" element={<EmergencyContactForm />} />
      <Route exact path="/doctor-info" element={<DoctorContactForm />} />
      <Route exact path="/consent" element={<ConsentForm />} />
      <Route exact path="/harmless-agreement" element={<HoldHarmlessAgreement />} />
      <Route exact path="/term" element={<TermsOfService />} />


      <Route exact path="/verify" element={<IDVerificationComponent />} />
      <Route exact path="/consent-guard" element={<ConsentFormGuard />} />
      <Route exact path="/admin" element={<AdminDashboard />} />

      <Route exact path="/medical-review" element={<MedicalReview />} />
      <Route exact path="/price" element={<PriceServices />} />
      <Route exact path="/select" element={<TattooComponent />} />

      <Route exact path="/skin" element={<SkinCondition />} />


      <Route exact path="/AppointmentList" element={<AppointmentList/>}/>
      <Route exact path="/billing/" element={<BillingComponent/>}/>
      <Route exact path="/billing/:id/:step" element={<BillingComponent/>}/>
      <Route exact path='/artist-dashboard' element={<ArtistDashboard/>}/>
      </Route>
      {/* <Route element={<AdminRoutes/>}>
      </Route> */}

    </Routes>
    </>
      
    )
}
