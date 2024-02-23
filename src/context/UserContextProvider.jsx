import React, { useState } from "react";

import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    selectedTattooType: null,
    tattooLocation: null,
    headLocation: null,
    faceLocation: null,
    scalpLocation: null,
    earLocation: null,
    chestLocation: null,
    armLocation: null,
    armInside: null,
    handLocation: null,
    legLocation: null,
    legInside: null,
    footLocation: null,
    piercingLocation: null,
    images: [],
    bodyPart: null,
    hairLoss: [],
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
    state: "Florida",
    useDoctorRecommendation: false,
  });
  const [harmlessagreement, setharmlessagreement] = useState({
    name: "",
    initials: "",
    signatureurl: "",
    agreed: false,
    gaurdianInitials : "",
    gaurdianSignature:"",
    gaurdianAgreed :false,
    gaurdianName : ""
  });
  
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
  const [description, setDescription] = useState("")

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
        setSelectedTeeth
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
