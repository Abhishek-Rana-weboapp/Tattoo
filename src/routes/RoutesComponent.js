import React, { useContext, useEffect, } from 'react'
import {  Route, Routes, useLocation,  } from 'react-router-dom'
import Login from '../component/login';
import SignUp from '../component/signup';
import ForgetPassword from '../component/forgetPassword';
import Resetpassword from '../component/resetPassword';
import Dashboard from '../component/dashboard';
import TattooDashboard from '../component/tatoodashboard/tatoodashboard'
import HeadTattoo from '../component/tatoodashboard/headDashboard'
import FaceDashboard from '../component/tatoodashboard/face'
import Forehead from '../component/tatoodashboard/forehead'
import FaceTemple from '../component/tatoodashboard/temple'
import Eyebrow from '../component/tatoodashboard/eyebrow'
import Eyelid from '../component/tatoodashboard/eyelid'
import Nose from '../component/tatoodashboard/nose'
import Cheeks from '../component/tatoodashboard/cheeks'
import Lip from '../component/tatoodashboard/lip'
import Jaw from '../component/tatoodashboard/jaw'
import Scalp from '../component/tatoodashboard/scalp'
import Ear from '../component/tatoodashboard/ear'
import Neck from '../component/tatoodashboard/Neck';
import Nipple from '../component/tatoodashboard/nipple';
import UnderChest from '../component/tatoodashboard/underChest';
import EarDashboard from '../component/tatoodashboard/earInside'
import ChestDeshboard from '../component/tatoodashboard/chestDashboard'
import ChestInside from '../component/tatoodashboard/chestInside';
import Torso from '../component/tatoodashboard/torso';
import Back from '../component/tatoodashboard/Back';
import Arm from '../component/tatoodashboard/Arm';
import ArmDashboard from '../component/tatoodashboard/armDashboard';
import ArmInside from '../component/tatoodashboard/armInside';
import Hand from '../component/tatoodashboard/hand';
import HandInside from '../component/tatoodashboard/handInside';
import Hip from '../component/tatoodashboard/hip';
import Glute from '../component/tatoodashboard/glutes';
import Pelvic from '../component/tatoodashboard/pelvic';
import Leg from '../component/tatoodashboard/leg';
import LegDashboard from '../component/tatoodashboard/legDashboard';
import LegInside from '../component/tatoodashboard/legInside';
import Foot from '../component/tatoodashboard/foot';
import FootDashboard from '../component/tatoodashboard/footDashboard'

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

  const {isVisible, setIsVisible, alert, user, setUser, formData,setFormData,emerformData, setemerFormData,drformData, setdrFormData, count,currentSelection,finalUser } = useContext(UserContext)
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
        <img src={Title} className='w-4/5 md:w-2/5'></img>
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
      <Route exact path="/head" element={<HeadTattoo />} />
      <Route exact path="/face" element={<FaceDashboard />} />
      <Route exact path="/forehead" element={<Forehead />} />
      <Route exact path="/neck" element={<Neck />} />
      <Route exact path="/face-temple" element={<FaceTemple />} />

      
      <Route exact path="/eyebrow" element={<Eyebrow />} />
      <Route exact path="/eyelid" element={<Eyelid />} />
      <Route exact path="/nose" element={<Nose />} />
      <Route exact path="/cheeks" element={<Cheeks />} />
      <Route exact path="/lip" element={<Lip />} />
      <Route exact path="/jaw" element={<Jaw />} />
      <Route exact path="/upper-chest" element={<UnderChest />} />
      <Route exact path="/scalp" element={<Scalp />} />
      <Route exact path="/ear" element={<Ear />} />
      <Route exact path="/ear-dashboard" element={<EarDashboard />} />
      <Route exact path="/chest" element={<ChestDeshboard />} />
      <Route exact path="/under-chest" element={<ChestInside />} />
      <Route exact path="/torso" element={<Torso />} />
      <Route exact path="/back" element={<Back />} />
      <Route exact path="/arm" element={<Arm />} />
      <Route exact path="/arm-dashboard" element={<ArmDashboard />} />
      <Route exact path="/arm-inside" element={<ArmInside />} />
      <Route exact path="/hand" element={<Hand />} />
      <Route exact path="/hand-inside" element={<HandInside />} />
      <Route exact path="/hip" element={<Hip />} />
      <Route exact path="/glutes" element={<Glute />} />
      <Route exact path="/pelvic" element={<Pelvic />} />
      <Route exact path="/leg" element={<Leg />} />
      <Route exact path="/nipple" element={<Nipple />} />
      <Route exact path="/leg-dashboard" element={<LegDashboard />} />
      <Route exact path="/leginside" element={<LegInside />} />
      <Route exact path="/foot" element={<Foot />} />
      <Route exact path="/foot-dashboard" element={<FootDashboard />} />
      <Route exact path="/temple" element={<FaceTemple />} />
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
