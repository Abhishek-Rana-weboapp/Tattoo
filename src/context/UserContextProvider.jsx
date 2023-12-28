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
        state: '',
      });
    
      const [drformData, setdrFormData] = useState({
        name: '',
        name: '',
        city: '',
        state: '',
        useDoctorRecommendation: false,
      });
      const [harmlessagreement,setharmlessagreement]=useState({
        name: '',
        initials:'',
        signatureurl:''
      })
      const [initials, setInitials] = useState({});
      const [isVisible , setIsVisible] = useState(false)


    return (
        <UserContext.Provider value={{isVisible , setIsVisible ,user,setUser,formData,setFormData,selectedPattern,setSelectedPattern,emerformData,setemerFormData,drformData,setdrFormData,initials,setInitials,harmlessagreement,setharmlessagreement}}>
            {children}

        </UserContext.Provider>
    )
}


export default UserContextProvider