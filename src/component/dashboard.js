import React, { useEffect } from "react";
import Tattoo from "../assets/tattoo.png";
import microblading from "../assets/microblading.png";
import piercings from "../assets/piercings.png";
import removal from "../assets/removal.png";
import smp from "../assets/smp.png";
import tooth from "../assets/tooth.png";
import UserContext from "../context/UserContext";
import DisplayCard from "./card/DisplayCard";
import microblading_active from "../assets/microblading_active.png";
import smp_gold from "../assets/smp_gold.png";
import tooth_gold from "../assets/tooth_gold.png";
import removal_gold from "../assets/removal_gold.png";
import piercings_gold from "../assets/piercings_gold.png";
import tattoo_gold from "../assets/tattoo_gold.png";
import { useTranslation } from "react-i18next";
function Dashboard() {
  const { t } = useTranslation();
  const {
    user,
    setUser,
    setFormData,
    setemerFormData,
    setdrFormData,
    setInitials,
    setharmlessagreement,
    setGaurdianInitials,
    setCount,
    setDescription,
    finalUser,
    setFinalUser,
    setCurrentSelection,
    setSelectedTeeth
  } = React.useContext(UserContext);

  const handleTattooTypeSelect = (selectedType) => {
    setUser({ ...user, selectedTattooType: selectedType });
    setFinalUser({...finalUser, selectedTattooType : selectedType})
    sessionStorage.setItem("typeofservice", selectedType)
  };

  useEffect(() => {
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("typeofservice")
    sessionStorage.removeItem("emerformData")
    sessionStorage.removeItem("drformData")
    sessionStorage.removeItem("medicalHistory")
    if (user?.selectedTattooType !== null){
      setUser({
        selectedTattooType: null,
        1: null,
        2: null,
        3: null,
        4: null,
      });

      setFinalUser({})

      setFormData({});
      setCurrentSelection(1)
      setCount(1)

      setharmlessagreement({
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

      setemerFormData({
        name: "",
        phone: "",
        city: "",
        state: "Florida",
      });
      setDescription({})
      setSelectedTeeth([])

      setdrFormData({
        name: "",
        phone: "",
        city: "",
        state: "Florida",
        useDoctorRecommendation: false,
      });

      setInitials({});
      setGaurdianInitials({});
    }
  }, []);

  const menu = [
    {
      name: t("TATTOO"),
      type: "tattoo",
      link: "/count",
      src: Tattoo,
      activesrc: tattoo_gold,
    },
    {
      name: t("PIERCING"),
      type: "piercing",
      link: "/count",
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
    <div className="md:w-3/4 w-full h-full flex flex-col gap-3 justify-center items-center">
      <h1 className="uppercase text-white font-bold">
        {t("Select a service")}
      </h1>
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
