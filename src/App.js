import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './component/login';
import SignUp from './component/signup';
import ForgetPassword from './component/forgetPassword';
import Resetpassword from './component/resetPassword';
import Dashboard from './component/dashboard';
import TattooDashboard from './component/tatoodashboard/tatoodashboard'
import HeadTattoo from './component/tatoodashboard/headDashboard'
import FaceDashboard from './component/tatoodashboard/face'
import Forehead from './component/tatoodashboard/forehead'
import FaceTemple from './component/tatoodashboard/temple'
import Eyebrow from './component/tatoodashboard/eyebrow'
import Eyelid from './component/tatoodashboard/eyelid'
import Nose from './component/tatoodashboard/nose'
import Cheeks from './component/tatoodashboard/cheeks'
import Lip from './component/tatoodashboard/lip'
import Jaw from './component/tatoodashboard/jaw'
import Scalp from './component/tatoodashboard/scalp'
import Ear from './component/tatoodashboard/ear'
import Neck from './component/tatoodashboard/Neck';
import Nipple from './component/tatoodashboard/nipple';
import UnderChest from './component/tatoodashboard/underChest';
import EarDashboard from './component/tatoodashboard/earInside'
import ChestDeshboard from './component/tatoodashboard/chestDashboard'
import ChestInside from './component/tatoodashboard/chestInside';
import Torso from './component/tatoodashboard/torso';
import Back from './component/tatoodashboard/Back';
import Arm from './component/tatoodashboard/Arm';
import ArmDashboard from './component/tatoodashboard/armDashboard';
import ArmInside from './component/tatoodashboard/armInside';
import Hand from './component/tatoodashboard/hand';
import HandInside from './component/tatoodashboard/handInside';
import Hip from './component/tatoodashboard/hip';
import Glute from './component/tatoodashboard/glutes';
import Pelvic from './component/tatoodashboard/pelvic';
import Leg from './component/tatoodashboard/leg';
import LegDashboard from './component/tatoodashboard/legDashboard';
import LegInside from './component/tatoodashboard/legInside';
import Foot from './component/tatoodashboard/foot';
import FootDashboard from './component/tatoodashboard/footDashboard'

import Piercing from './component/piercingdashboard/piercingDashboard'
import BellyPiercing from './component/piercingdashboard/bellyPiercing'
import EarPiercing from './component/piercingdashboard/earPiercing'
import FacialPiercing from './component/piercingdashboard/facialPiercing'
import JweleryPiercing from './component/piercingdashboard/facialPiercing'
import NipplePiercing from './component/piercingdashboard/nipplePiercing'
import NosePiercing from './component/piercingdashboard/nosePiercing'
import OralPiercing from './component/piercingdashboard/oralPiercing'
import SurfacePiercing from './component/piercingdashboard/surfacePiercing'
import VaginalPiercing from './component/piercingdashboard/vaginalPiercing';
import ToothGem from './component/toothGem';
import PermanentMakeup from './component/permanentMakeup';
import HairLossPatternSelection from './component/smp'
import MedicalForm from './component/medicalHistory';
import EmergencyContactForm from './component/emergency';
import DoctorContactForm from './component/doctorInfo';
import ConsentForm from './component/consent';
import HoldHarmlessAgreement from './component/harmlessAgreement';
import TermsOfService from './component/termofService';
import UserContextProvider from './context/UserContextProvider';
import ConsentFormGuard from './component/consentForm';
import IDVerificationComponent from './component/employeeVerfy';
import AdminDashboard from './component/Admin';
import MedicalReview from './component/medicalReview';
import PriceServices from './component/priceServices';
import TattooComponent from './component/serviceSelection';
import SkinCondition from './component/skinCondition';
import AppointmentList from './component/AppointmentList';
import CalculateBilling from './component/billing';
import SignaturePad from './component/signature';
import SignaturePad_see from './component/signature_see';
import JewelleryPiercing from './component/piercingdashboard/jweleryPiercing';

import Title from "./assets/Title.png"
import LogoWrapper from './component/wrapper/LogoWrapper';
import RoutesComponent from './routes/RoutesComponent';

function App() {

  // const location = useLocation()
  // console.log(location)
  return (
    <UserContextProvider>
    <Router>
      <div className="App bg-[#000000] w-screen  flex flex-col items-center overflow-auto p-2 gap-2" style={{height : "100dvh"}}>
          {/* <div className='flex justify-center'>
        <img src={Title} className='w-4/5 md:w-2/5'></img>
          </div> */}
      <RoutesComponent />
      </div>
    </Router>
    </UserContextProvider>
  );
}

export default App;








































