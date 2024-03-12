import React, { useEffect, useState } from "react";
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
import { useTranslation } from "react-i18next";
function Dashboard() {
  const { t } = useTranslation();
  const {
    user,
    setUser,
    setIsVisible,
    setFormData,
    setemerFormData,
    setdrFormData,
    setInitials,
    setharmlessagreement,
    setGaurdianInitials,
  } = React.useContext(UserContext);
  const userObject = user || {};

  const handleTattooTypeSelect = (selectedType) => {
    setUser({ ...user, selectedTattooType: selectedType });
  };


  const [activeSrc, setActiveSrc] = useState({
    tattoo: require("../assets/tattoo_gold.png"),
    piercing: require("../assets/piercings_gold.png"),
    toothGems: require("../assets/tooth_gold.png"),
    permanentMakeup: require("../assets/microblading_active.png"),
    smp: require("../assets/smp_gold.png"),
    removal: require("../assets/removal_gold.png"),
  });

  useEffect(() => {
    sessionStorage.removeItem("user")
    setIsVisible(true);
    if (user?.selectedTattooType !== null) {
      setUser({
        selectedTattooType: null,
        level1: null,
        level2: null,
        level3: null,
        level4: null,
      });

      setFormData({});

      setharmlessagreement({
        name: "",
        initials: "",
        signatureurl: "",
        agreed: false,
      });

      setemerFormData({
        name: "",
        phone: "",
        city: "",
        state: "Florida",
      });

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
      link: "/tattoo",
      src: Tattoo,
      activesrc:activeSrc.tattoo,
    },
    {
      name: t("PIERCING"),
      type: "piercing",
      link: "/piercing",
      src: piercings,
      activesrc:activeSrc.piercing,
    },
    {
      name: t("TOOTH GEMS"),
      type: "tooth-gems",
      link: "/tooth-gems",
      src: tooth,
      activesrc: activeSrc.toothGems,
    },
    {
      name: t("PERMANENT-MAKEUP"),
      type: "permanent-makeup",
      link: "/permanent-makeup",
      src: microblading,
      activesrc: activeSrc.permanentMakeup,
    },
    {
      name: t("SMP"),
      type: "smp",
      link: "/smp",
      src: smp,
      activesrc: activeSrc.smp,
    },
    {
      name: t("REMOVAL"),
      type: "removal",
      link: "/tattoo",
      src: removal,
      activesrc: activeSrc.removal,
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
