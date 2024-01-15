import React, { useState } from 'react';

import UserContext from "./UserContext";


const UserContextProvider = ({children})=>{
    const [user, setUser] = useState({
        selectedTattooType: null, 
        tattooLocation: null, 
        headLocation: null,
        faceLocation : null,
        scalpLocation : null,
        earLocation : null,
        chestLocation : null,
        armLocation:null,
        armInside:null,
        handLocation:null,
        legLocation:null,
        legInside:null,
        footLocation:null,
        piercingLocation:null,
        images: [], 
        bodyPart : null,
        hairLoss:[]

      });
      const [formData, setFormData] = useState({
        page1: { yes: false, no: false },
        page2: { yes: false, no: false, pregnant: false, nursing: false },
        page3: { yes: false, no: false, explanation: '' },
        page4: { yes: false, no: false, explanation: '' },
        page5: { yes: false, no: false, explanation: '' },
        page6: { yes: false, no: false, explanation: '' },
        page7: { yes: false, no: false, explanation: '' },
        page8: { yes: false, no: false, explanation: '' },
      });
      
      const [selectedPattern, setSelectedPattern] = useState(null);

      const [emerformData, setemerFormData] = useState({
        name: '',
        phone: '',
        city: '',
        state: 'Florida',
      });
    
      const [drformData, setdrFormData] = useState({
        name: '',
        name: '',
        city: '',
        state: 'Florida',
        useDoctorRecommendation: false,
      });
      const [harmlessagreement,setharmlessagreement]=useState({
        name: '',
        initials:'',
        signatureurl:'',
        agreed:false
      })
      const [initials, setInitials] = useState({});
      const [isVisible , setIsVisible] = useState(false)
      const [alert , setAlert] = useState(false)
      const[alertMessage , setAlertMessage] = useState()
      const [updateAppointment , setUpdateAppointment] = useState()


    return (
        <UserContext.Provider value={{updateAppointment , setUpdateAppointment, isVisible , setIsVisible, alert , setAlert, alertMessage , setAlertMessage ,user,setUser,formData,setFormData,selectedPattern,setSelectedPattern,emerformData,setemerFormData,drformData,setdrFormData,initials,setInitials,harmlessagreement,setharmlessagreement}}>
            {children}
        </UserContext.Provider>
    )
}


export default UserContextProvider