import React from 'react'
import Tattoo from '../assets/tattoo.png'
import microblading from '../assets/microblading.png'
import piercings from '../assets/piercings.png'
import removal from '../assets/removal.png'
import smp from '../assets/smp.png'
import tooth from '../assets/tooth.png'
import { useNavigate ,Link, useLocation} from "react-router-dom";
import UserContext from '../context/UserContext';
import Title from "../assets/Title.png"
import DisplayCard from './card/DisplayCard';
import microblading_active from "../assets/microblading_active.png"
import smp_gold from "../assets/smp_gold.png"
import tooth_gold from "../assets/tooth_gold.png"
import removal_gold from "../assets/removal_gold.png"
import piercings_gold from "../assets/piercings_gold.png"
import tattoo_gold from "../assets/tattoo_gold.png"



function Dashboard() {

  const {user,setUser} = React.useContext(UserContext)
  const userObject = user || {};
  

  const handleTattooTypeSelect = (selectedType) => {
    setUser({ ...userObject,selectedTattooType: selectedType });
  };

  const menu = [
    {
      name : "TATTOO",
      type : "tattoo",
      link: "/tattoo",
      src:Tattoo,
      activesrc:tattoo_gold
    },
    {
      name : "PIERCING",
      type : "piercing",
      link: "/piercing",
      src:piercings,
      activesrc:piercings_gold

    },
    {
      name : "TOOTH GEMS",
      type : "tooth-gems",
      link: "/tooth-gems",
      src:tooth,
      activesrc:tooth_gold
    },
    {
      name : "PERMANENT-MAKEUP",
      type : "permanent-makeup",
      link: "/permanent-makeup",
      src:microblading,
      activesrc:microblading_active
    },
    {
      name : "SMP",
      type : "smp",
      link: "/smp",
      src:smp,
      activesrc:smp_gold
    },
    {
      name : "REMOVAL",
      type : "removal",
      link: "/tattoo",
      src:removal,
      activesrc:removal_gold
    },
  ]

  return (
    <div className='w-3/4 h-full flex flex-col gap-4 justify-center items-center'
    >
      
        <img src={Title} className='w-3/5'></img>
        <div className="grid grid-cols-2 gap-x-10 gap-y-10 w-full">
          {
            menu.map((menu, index)=>{
              return <DisplayCard key={index} data={menu} name={menu.name} type={menu.type} link={menu.link} onClick={handleTattooTypeSelect} selectedType={user.selectedTattooType} src={menu.src} />
            })
          }
          
        </div> 
        
       
    </div>
        );
}

export default Dashboard;