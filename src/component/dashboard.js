import React, { useEffect } from "react";
import Tattoo from "../assets/tattoo.png";
import microblading from "../assets/microblading.png";
import piercings from "../assets/piercings.png";
import removal from "../assets/removal.png";
import smp from "../assets/smp.png";
import tooth from "../assets/tooth.png";
import { useNavigate, Link, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import Title from "../assets/Title.png";
import DisplayCard from "./card/DisplayCard";
import microblading_active from "../assets/microblading_active.png";
import smp_gold from "../assets/smp_gold.png";
import tooth_gold from "../assets/tooth_gold.png";
import removal_gold from "../assets/removal_gold.png";
import piercings_gold from "../assets/piercings_gold.png";
import tattoo_gold from "../assets/tattoo_gold.png";
import { useTranslation } from 'react-i18next';
function Dashboard() {
  const { t } = useTranslation();
  const { user, setUser, setIsVisible,setFormData , setemerFormData , setdrFormData, setInitials, setharmlessagreement } = React.useContext(UserContext);
  const userObject = user || {};

  const handleTattooTypeSelect = (selectedType) => {
    setUser({ ...user, selectedTattooType: selectedType });
  };

  useEffect(() => {
    setIsVisible(true)
    if(user?.selectedTattooType !== null){
      setUser({
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
  
      })
      setFormData({
        page1: { yes: false, no: false },
        page2: { yes: false, no: false, pregnant: false, nursing: false },
        page3: { yes: false, no: false, explanation: '' },
        page4: { yes: false, no: false, explanation: '' },
        page5: { yes: false, no: false, explanation: '' },
        page6: { yes: false, no: false, explanation: '' },
        page7: { yes: false, no: false, explanation: '' },
        page8: { yes: false, no: false, explanation: '' },
      })

      setInitials({})

      setharmlessagreement({
        name: '',
        initials:'',
        signatureurl:'',
        agreed:false
      })
  
      setemerFormData({
        name: '',
        phone: '',
        city: '',
        state: '',
      })
  
      setdrFormData({
        name: '',
        phone: '',
        city: '',
        state: '',
        useDoctorRecommendation: false,
      })
    }
  }, []);



  const menu = [
    {
      name: t("TATTOO"),
      type: "tattoo",
      link: "/tattoo",
      src: Tattoo,
      activesrc: tattoo_gold,
    },
    {
      name: t("PIERCING"),
      type: "piercing",
      link: "/piercing",
      src: piercings,
      activesrc: piercings_gold,
    },
    {
      name: t("TOOTH GEMS"),
      type: "tooth-gems",
      link: "/tooth-gems",
      src: tooth,
      activesrc: tooth_gold,
    },
    {
      name: t("PERMANENT-MAKEUP"),
      type: "permanent-makeup",
      link: "/permanent-makeup",
      src: microblading,
      activesrc: microblading_active,
    },
    {
      name: t("SMP"),
      type: "smp",
      link: "/smp",
      src: smp,
      activesrc: smp_gold,
    },
    {
      name: t("REMOVAL"),
      type: "removal",
      link: "/tattoo",
      src: removal,
      activesrc: removal_gold,
    },
  ];

  return (
    <div className="md:w-3/4 w-full h-full flex flex-col gap-5 justify-center items-center">
      <div className="grid grid-cols-2 gap-5 w-full">
        {menu?.map((menu, index) => {
          return (
            <DisplayCard
              key={index}
              data={menu}
              name={menu?.name}
              type={menu?.type}
              link={menu?.link}
              onClick={handleTattooTypeSelect}
              selectedType={user?.selectedTattooType}
              src={menu?.src}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
