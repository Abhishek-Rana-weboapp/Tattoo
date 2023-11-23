import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from '../context/UserContext';

function TermsOfService() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [initials, setInitials] = useState({});
  const totalPages = 3; 
  const pageContents = [
    `No Foods or Drinks allowed in tattoo workstation.
    Please sit as still as possible while being tattooed, your final satisfaction is our priority.
    Only (1) additional person is allowed in tattoo station aside from the individual being tattooed.
    Please do not leave the workstation during a break or once the tattoo has been completed without it being covered by the artist.
    During a break or while being tattooed, DO NOT TOUCH YOUR TATTOO.`,

    `DO NOT overexpose the tattoo to direct sunlight until it’s fully healed.
    DO NOT submerge tattoo in water, saltwater, pools, hot tubs, saunas, and steam until it’s fully healed.
    AVOID excessive sweating for at least 3 days. Refrain from workouts and engaging in physically demanding jobs / labor.
    DO NOT forget to ask for your aftercare products and aftercare instructions before leaving the shop.`,

    `By completing the following transaction, you acknowledge and agree that all sales are final and non-refundable.
    We accept all major credit cards, but there will be a 10% handling fee charged. For example, $100 you will pay a $10 fee.
    Cash is Always Better, Save Your Money! There is an ATM across the street at Chase Bank & the gas station next door.
    Some tattoos are done at a fixed price given by the artist or managers.
    Custom full sleeves and large-scale pieces are done at an hourly shop rate of $150-$350 per hour depending on the artist.
    Some artists charge between $1,200 - $2,800 for a full day up to 8 hours.
    All cover-ups and fix-ups are done at an hourly shop rate of $200-$350 per hour depending on the artist.
    If you are paying by the hour depending on the tattoo, some tattoo will be charged stencil time.`,
  ];
  let minorData = JSON.parse(sessionStorage.getItem('responseData'))

  const handleInitialsChange = (page, initialsValue) => {
    setInitials({ ...initials, [page]: initialsValue });
  };




  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    else if(currentPage == 3){
      navigate('/verify')
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='outer container' style={{
        border: '1px solid #d8d6d6'
      
      }}>
      <h1>Terms of Service - Page {currentPage}</h1>
      <p>{pageContents[currentPage - 1]}</p>
      <label>
        Initials: 
        <input
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

export default TermsOfService;
