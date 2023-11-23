
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from '../context/UserContext';

function ConsentForm() {
  const navigate = useNavigate();
  const { initials, setInitials } = React.useContext(UserContext);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 13; 
  const statements = [
    "I am at least 18 years of age.",
    "I do not have any mental or medical impairment that could affect my well-being because of my decision to get a tattoo.",
    "I agree to follow instructions concerning the care of my tattoo. Any tattoo touch-ups will be done at my own expense.",
    "I understand that colors may vary depending on skin tone. I understand that the finished tattoo may look different from the original design.",
    "I, being of sound mind and body, I hereby release any and all employees, contractors, agents, or persons representing Fame Tattoos, Inc. from all responsibility. I agree not to sue Fame Tattoos, Inc. or its heirs or assigns in connection with any and all damages, claims, demands, rights, and causes of action of whatever kind or nature, based upon injuries, property damages, or death of myself or any other persons arising from my decisions to have any tattoo related work at this time, whether or not caused by any negligence of Fame Tattoos, Inc. and its heirs and employees.",
    "I agree for myself, my heirs, assigns and legal representatives to hold harmless from all damages, actions, causes of action, claim judgments, costs of litigations, Attorney fees, and all other costs and expenses which might arise from my decision to have any tattoo work done by Fame Tattoos, Inc. and its heirs and employees.",
    "I agree to pay for any and all damages and injuries to any persons and property belonging to Fame Tattoos, Inc. or any other person to whom they may become liable contractually or by operation of law, caused by or resulting from my decision to have any tattoo done",
    "I acknowledge that obtaining this tattoo is my choice alone and will result in a permanent change to my appearance and that no representation has been made to me as to the ability to later restore the skin involved in this tattoo to its prior condition",
    "I have been advised that all tattoos will be permanent and that it can only be removed with a surgical procedure, and that any effective removal will leave permanent scarring and disfigurement. This cautionary notice is required to be provided to me by the health department and I hereby acknowledge receipt of this formal notice",
    "I hereby grant irrevocable consent to and authorize the use of any reproduction by Fame Tattoos, Inc. Any and all photographs and/or video which are taken this day of me, negative or positive proof which will be hereby attached for any purposes whatsoever, without further compensation to me. All negatives, together with the prints, video, or live internet stream shall become and remain the property of Fame Tattoos, Inc., solely and completely",
    "I acknowledge infection is always possible as a result of obtaining a tattoo. I have been provided with information describing the tattoo procedure to be performed and instructions on aftercare. I have been made aware that if I have any signs or symptoms of infection, such as swelling, pain, redness, warmth, fever, unusual discharge, or odor to contact my physician. Additionally, I take full responsibility for the care of my new tattoo and/or piercing site, following the provided instructions given verbally, via text message, email, or on WWW.FAMETATTOOS.COM",
    "I hereby consent to receive text messages and emails from Fame Tattoos, Inc., for transactional, informational, and promotional purposes. I understand that standard message and data rates may apply for SMS messages, and I acknowledge that I'm responsible for any such charges incurred",
    "I swear, affirm, and agree that all the above information is true and correct and that I understand it."
  ];

  const handleInitialsChange = (page, initialsValue) => {
    setInitials({ ...initials, [page]: initialsValue });
  };

  const nextPage = () => {
    if (currentPage < totalPages && currentPage !== 13) {
      // Check if the initials for the current page have been filled
      if (!initials[currentPage]) {
        alert('Please provide your initials before moving to the next question.');
      } else {
        setCurrentPage(currentPage + 1);
      }
    } else if (currentPage === 13) {
      navigate('/harmless-agreement');
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1>Consent Form - Page {currentPage}</h1>
      <p>{statements[currentPage - 1]}</p>
      <label>
        Initials: <input
          type="text"
          value={initials[currentPage] || ''}
          onChange={(e) => handleInitialsChange(currentPage, e.target.value)}
        />
      </label>
      <button onClick={prevPage}>Previous</button>
      <button onClick={nextPage}>Next</button>
    </div>
  );
}

export default ConsentForm;
