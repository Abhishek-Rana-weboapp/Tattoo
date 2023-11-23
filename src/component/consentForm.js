import React, { useState } from 'react';

const ConsentFormGuard = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    phone: '',
    email: '',
    procedureType: '',
    procedureDescription: '',
    procedureLocation: '',
    consentAgree: false,
    photoConsent: false,
    techName: '',
    techSignature: '',
    techDate: '',
    clientSignature: '',
    clientSignatureDate: '',
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <div className="container" style={{ width: '80%', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Consent Form</h1>
      <form style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '5px' }}>
        <section style={{ margin: '10px 0' }}>
          <h2>Client Information</h2>
          <label style={{ fontWeight: 'bold' }} htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} value={formData.fullName} onChange={handleInputChange} required /><br />

          <label style={{ fontWeight: 'bold' }} htmlFor="dateOfBirth">Date of Birth:</label>
          <input type="date" id="dateOfBirth" name="dateOfBirth" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} value={formData.dateOfBirth} onChange={handleInputChange} required /><br />

          <label style={{ fontWeight: 'bold' }} htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} value={formData.address} onChange={handleInputChange} required /><br />

          <label style={{ fontWeight: 'bold' }} htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} value={formData.phone} onChange={handleInputChange} required /><br />

          <label style={{ fontWeight: 'bold' }} htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} value={formData.email} onChange={handleInputChange} required /><br />
        </section>

        <section style={{ margin: '10px 0' }}>
          <h2>Procedure Information</h2>
          <label style={{ fontWeight: 'bold' }} htmlFor="procedureType">Procedure (Tattoo/Piercing/Permanent Makeup):</label>
          <input type="text" id="procedureType" name="procedureType" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} value={formData.procedureType} onChange={handleInputChange} required /><br />

          <label style={{ fontWeight: 'bold' }} htmlFor="procedureDescription">Description of Procedure:</label>
          <textarea id="procedureDescription" name="procedureDescription" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} rows="4" value={formData.procedureDescription} onChange={handleInputChange} required></textarea><br />

          <label style={{ fontWeight: 'bold' }} htmlFor="procedureLocation">Location of Procedure:</label>
          <input type="text" id="procedureLocation" name="procedureLocation" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} value={formData.procedureLocation} onChange={handleInputChange} required /><br />
        </section>

        <section style={{ margin: '10px 0' }}>
          <h2>Risks and Benefits</h2>
          <p style={{ fontWeight: 'bold' }}>I have been informed of the potential risks, benefits, and alternatives associated with the chosen procedure, including but not limited to infection, allergic reactions, scarring, and dissatisfaction with the results. I understand that the results may vary based on my skin type, lifestyle, and adherence to aftercare instructions.</p>
        </section>

        <section style={{ margin: '10px 0' }}>
          <h2>Aftercare Instructions</h2>
          <p style={{ fontWeight: 'bold' }}>I understand that proper aftercare is essential for the success of the procedure and to minimize the risk of complications. I commit to following the aftercare instructions provided by the technician.</p>
        </section>

        <section style={{ margin: '10px 0' }}>
          <h2>Consent</h2>
          <label style={{ fontWeight: 'bold' }} htmlFor="consentAgree">I hereby consent to the chosen procedure and confirm that I am undertaking it willingly and voluntarily. I acknowledge that I have had the opportunity to ask questions, and all my concerns have been addressed to my satisfaction.</label>
          <input type="checkbox" id="consentAgree" name="consentAgree" style={{ marginLeft: '5px' }} checked={formData.consentAgree} onChange={handleInputChange} required /><br />
        </section>

        <section style={{ margin: '10px 0' }}>
          <h2>Release of Liability</h2>
          <p style={{ fontWeight: 'bold' }}>I release the technician, the establishment, and their employees from any liability related to the procedure. I understand that the outcome may vary from person to person, and no guarantees have been made regarding the results.</p>
        </section>

        <section style={{ margin: '10px 0' }}>
          <h2>Before and After Photos</h2>
          <label style={{ fontWeight: 'bold' }} htmlFor="photoConsent">I agree to allow the technician to take before and after photos of the procedure for documentation and promotional purposes.</label>
          <input type="checkbox" id="photoConsent" name="photoConsent" style={{ marginLeft: '5px' }} checked={formData.photoConsent} onChange={handleInputChange} required /><br />
        </section>

        <section style={{ margin: '10px 0' }}>
          <h2>Witness (Technician)</h2>
          <label style={{ fontWeight: 'bold' }} htmlFor="techName">Technician's Name:</label>
          <input type="text" id="techName" name="techName" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} value={formData.techName} onChange={handleInputChange} required /><br />

          <label style={{ fontWeight: 'bold' }} htmlFor="techSignature">Technician's Signature:</label>
          <input type="text" id="techSignature" name="techSignature" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} value={formData.techSignature} onChange={handleInputChange} required /><br />

          <label style={{ fontWeight: 'bold' }} htmlFor="techDate">Date (MM/DD/YYYY):</label>
          <input type="text" id="techDate" name="techDate" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} value={formData.techDate} onChange={handleInputChange} required /><br />
        </section>

        <section style={{ margin: '10px 0' }}>
          <h2>Client's Signature</h2>
          <label style={{ fontWeight: 'bold' }} htmlFor="clientSignature">Signature:</label>
          <input type="text" id="clientSignature" name="clientSignature" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} value={formData.clientSignature} onChange={handleInputChange} required /><br />

          <label style={{ fontWeight: 'bold' }} htmlFor="clientSignatureDate">Date (MM/DD/YYYY):</label>
          <input type="text" id="clientSignatureDate" name="clientSignatureDate" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} value={formData.clientSignatureDate} onChange={handleInputChange} required /><br />
        </section>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ConsentFormGuard;
