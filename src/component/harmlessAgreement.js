import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from '../context/UserContext';

function HoldHarmlessAgreement() {
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
    <div className='outer container' style={{
        border: '1px solid #d8d6d6'
      
      }}>
      <h1>Hold Harmless Agreement</h1>
      <p>
        I, Name: {name} hereby acknowledge and agree that as a patron and customer of Fame Tattoos, Inc., its premises, facility, services, and products, involves risks of injury to persons or property, including but not limited to those described below, and patron/customer assumes full responsibility for such risks. In consideration of being a patron/customer of Fame Tattoos, Inc., for any purpose including, but not limited to, tattoo services, piercing services, tattoo removal services, tooth gems, observation, use of shop equipment, services, or participation in any way, patron/customer agrees to the following: Patron/Customer hereby releases and holds Fame Tattoos, Inc., its directors, officers, employees, independent contractors, and agents harmless from all liability to any patron/customer, their children, personal representatives, assigns, heirs, and next of kin for any loss, damage, personal injury, deformity, death, and forever gives up any claims or demands therefore, on account of injury to patron/customer's person or property, including injury leading to disfigurement or death of patron/customer, whether caused by the active or passive negligence of Fame Tattoos, Inc., or otherwise, to the fullest extent permitted by law, while patron/customer is in, upon, or about the Fame Tattoos, Inc., premises using or not using their services, facility, or equipment.
      </p>
      <div>
        <label>
          Name: 
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        </label>
      </div>
      <div>
        <label>
          Initials: 
          <input
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
      <button type="submit" onClick={handleSubmit}>Submit</button>
      {agreed && initials && (
        <div>
          {/* You may use a signature component or service here */}
          <p>Your Signature: [Signature]</p>
        </div>
      )}
    </div>
  );
}

export default HoldHarmlessAgreement;
