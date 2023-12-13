import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from '../context/UserContext';
import ProgressBar from './ProgressBar';
import Title from '../assets/Title.png';

function HoldHarmlessAgreement() {

  var progressValue = 85;
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [initials, setInitials] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleInitialsChange = (e) => {
    setInitials(e.target.value);
  };

  const handleAgreementToggle = () => {
    setAgreed(!agreed);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !initials || !agreed) {
      alert("Please fill in all required fields.");
    } else {
      navigate('/term');
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center overflow-auto bg-black p-8 text-white">
    {/* <img src={Title} className="w-3/5 mb-8" alt="Logo" /> */}
      <h1 className="text-3xl font-bold mb-4 text-yellow-500">Hold Harmless Agreement</h1>
      <p>
        I, Name: {name} hereby acknowledge and agree that as a patron and customer of Fame Tattoos, Inc., its premises, facility, services, and products, involves risks of injury to persons or property, including but not limited to those described below, and patron/customer assumes full responsibility for such risks. In consideration of being a patron/customer of Fame Tattoos, Inc., for any purpose including, but not limited to, tattoo services, piercing services, tattoo removal services, tooth gems, observation, use of shop equipment, services, or participation in any way, patron/customer agrees to the following: Patron/Customer hereby releases and holds Fame Tattoos, Inc., its directors, officers, employees, independent contractors, and agents harmless from all liability to any patron/customer, their children, personal representatives, assigns, heirs, and next of kin for any loss, damage, personal injury, deformity, death, and forever gives up any claims or demands therefore, on account of injury to patron/customer's person or property, including injury leading to disfigurement or death of patron/customer, whether caused by the active or passive negligence of Fame Tattoos, Inc., or otherwise, to the fullest extent permitted by law, while patron/customer is in, upon, or about the Fame Tattoos, Inc., premises using or not using their services, facility, or equipment.
      </p>
      <div>
        <label>
          Name: 
          <input
          className="bg-gray-700 text-white rounded-md m-4 p-2"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        
          Initials: 
          <input
          className="bg-gray-700 text-white  rounded-md  m-4 p-2"
            type="text"
            value={initials}
            onChange={handleInitialsChange}
          />
        </label>
      </div>
      <div>
        <label>
          I agree to the terms:
          <input
            type="checkbox"
            checked={agreed}
            onChange={handleAgreementToggle}
          />
        </label>
      </div>
      <button type="submit" className='bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black py-2 px-4 rounded-3xl font-bold  mb-2 mr-2' onClick={handleSubmit}>Submit</button>
      {agreed && initials && (
        <div>
          {/* You may use a signature component or service here */}
          <p>Your Signature: [Signature]</p>
        </div>
      )}
      <div className='w-full h-10' >
     
       </div>
    </div>
  );
}

export default HoldHarmlessAgreement;
