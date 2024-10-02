import React, { useState } from "react";

import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    selectedTattooType: null,
    1:null,
    2:null,
    3:null,
    4:null,
  });
  
  const [formData, setFormData] = useState({});

  const [selectedPattern, setSelectedPattern] = useState(null);

  const [emerformData, setemerFormData] = useState({
    name: "",
    phone: "",
    city: "",
    state: "Florida",
  });

  const [selectedTeeth, setSelectedTeeth] = useState([]);

  const [drformData, setdrFormData] = useState({
    name: "",
    city: "",
    phone:"",
    state: "Florida",
    useDoctorRecommendation: false,
  });
  const [harmlessagreement, setharmlessagreement] = useState({
    name: "",
    initials: "",
    initialsImg:"",
    signatureurl: "",
    agreed: false,
    gaurdianInitials : "",
    gaurdianInitialsImg:"",
    gaurdianSignature:"",
    gaurdianAgreed :false,
    gaurdianName : ""
  });

  const [initialsImg, setInitialsImg] = useState("")
  const [gaurdianInitialsImg, setGaurdianInitialsImg] = useState("")
  
  const [count, setCount] = useState(1)

  const [initials, setInitials] = useState({});

  const [gaurdianInitials, setGaurdianInitials] = useState({});
  const [checked, setChecked] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [updateAppointment, setUpdateAppointment] = useState();
  const [signature, setSignature] = useState();
  const [gaurdianSignature, setGaurdianSignature] = useState()
  const [step, setStep] = useState(0)
  const [description, setDescription] = useState({})
  const [currentSelection, setCurrentSelection] = useState(1)
  const [finalUser, setFinalUser] = useState({})

  return (
    <UserContext.Provider
      value={{
        checked,
        setChecked,
        updateAppointment,
        signature,
        setSignature,
        setUpdateAppointment,
        isVisible,
        setIsVisible,
        alert,
        setAlert,
        alertMessage,
        setAlertMessage,
        user,
        setUser,
        formData,
        setFormData,
        selectedPattern,
        setSelectedPattern,
        emerformData,
        setemerFormData,
        drformData,
        setdrFormData,
        initials,
        setInitials,
        harmlessagreement,
        setharmlessagreement,
        gaurdianSignature, 
        setGaurdianSignature,
        gaurdianInitials, 
        setGaurdianInitials,
        description, 
        setDescription,
        selectedTeeth, 
        setSelectedTeeth,
        count, 
        setCount,
        currentSelection, 
        setCurrentSelection,
        finalUser, 
        setFinalUser,
        initialsImg, setInitialsImg,
        gaurdianInitialsImg, setGaurdianInitialsImg,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
