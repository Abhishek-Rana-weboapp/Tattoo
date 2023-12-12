import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import ProgressBar from './ProgressBar';
import Title from '../assets/Title.png';


const ConsentFormGuard = () => {
  var progressValue = 100;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [showPopup,setShowPopup] =useState(null);

  const [signature_type,setsignature_type]=useState(null);

  const signatureRef = useRef(null);
  const [signatureImage, setSignatureImage] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    phone: '',

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

  const handleSave = () => {
    console.log("url===",signatureRef)
    const dataUrl = signatureRef.current.toDataURL();
    setSignatureImage(dataUrl);
  };
  const handleClear = () => {
    signatureRef.current.clear();
    setSignatureImage(null);
  };
  const handleSubmit = () => {
    setShowPopup(false);
  
    // You can now use the signatureImage state to submit the signature to your API
    if (signatureImage) {
      console.log('Submitting Signature:', signatureImage, signature_type);
  
      if (signature_type === 'techSignature') {
        setFormData((prevFormData) => ({
          ...prevFormData,
          techSignature: signatureImage,
        }));
      } else if (signature_type === 'clientSignature') {
        setFormData((prevFormData) => ({
          ...prevFormData,
          clientSignature: signatureImage,
        }));
      }
   setSignatureImage(null)
      // Add your API submission logic here
    } else {
      console.log('Please save a signature before submitting.');
    }
  };
  

  const handelapi =async (event) => {

    event.preventDefault()

   const appointment_detail= JSON.parse(sessionStorage.getItem("appointment_detail"))
    console.log("apoinment detail",formData)
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && (formData[key] === '' || formData[key] === null)) {
        alert(`Please fill in all the required fields.`);
        return;
      }
    }

    try {
      const response = await fetch(`${apiUrl}/appointment/post?update=true`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: appointment_detail.username,
          id:appointment_detail.id,
          consent_guard:formData
        }),
      });

   
      if (response.status === 201) {

        alert("Appointment booked");
          navigate('/');
        }
        else{
      
        alert('All fields are required, please refill the form.');
      }

    } catch (error) {
      console.error('Error:', error);
    }

 

  }

  return (
    <div className="w-full h-full flex flex-col items-center overflow-auto bg-black p-8 text-white">
    <img src={Title} className="w-3/5 mb-8" alt="Logo" />
    <h1 className="text-3xl font-bold mb-4 text-yellow-500">Consent Form</h1>
    <form className="bg-white p-6 rounded-md shadow-md w-4/5 text-black">

    <section style={{ margin: '10px 0', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
  <div style={{ flex: '1' }}>
    <h2>Client Information</h2>

    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <div style={{ marginRight: '10px', flex: '1' }}>
        <label style={{ fontWeight: 'bold', marginBottom: '5px' }} htmlFor="fullName">Full Name:</label>
        <input type="text" id="fullName" name="fullName" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} value={formData.fullName} onChange={handleInputChange} required />
      </div>

      <div style={{ flex: '1' }}>
        <label style={{ fontWeight: 'bold', marginBottom: '5px' }} htmlFor="dateOfBirth">Date of Birth:</label>
        <input type="date" id="dateOfBirth" name="dateOfBirth" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} value={formData.dateOfBirth} onChange={handleInputChange} required />
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <div style={{ marginRight: '10px', flex: '1' }}>
        <label style={{ fontWeight: 'bold', marginBottom: '5px' }} htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} value={formData.address} onChange={handleInputChange} required />
      </div>

      <div style={{ flex: '1' }}>
        <label style={{ fontWeight: 'bold', marginBottom: '5px' }} htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} value={formData.phone} onChange={handleInputChange} required />
      </div>
    </div>
  </div>
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



        {showPopup && (

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px solid #3498db', padding: '20px', borderRadius: '10px', maxWidth: '400px', margin: 'auto', marginTop: '50px', backgroundColor: '#ecf0f1' }}>
      <SignatureCanvas
        penColor="black"
        canvasProps={{ width: 300, height: 150, className: 'sigCanvas', style: { border: '1px solid #000', backgroundColor: 'white' } }}
        ref={signatureRef}
      />
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
        <button type="button" style={{ background: '#e74c3c', color: 'white', padding: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer', marginRight: '10px' }} onClick={handleClear}>Clear</button>
        <button type="button" style={{ background: '#2ecc71', color: 'white', padding: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer' }} onClick={handleSave}>Save</button>
      </div>

      {signatureImage && (
        <div style={{ marginTop: '20px' }}>
          <img src={signatureImage} alt="Signature Preview" style={{ border: '1px solid #000', borderRadius: '5px', maxWidth: '100%' }} />
        </div>
      )}

      {signatureImage && (
        <button type="button" style={{ marginTop: '10px', padding: '8px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={handleSubmit}>
          Submit Signature
        </button>
      )}
    </div>
        


      )}
          <h2>Witness (Technician)</h2>
          <label style={{ fontWeight: 'bold' }} htmlFor="techName">Technician's Name:</label>
          <input type="text" id="techName" name="techName" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} value={formData.techName} onChange={handleInputChange} required /><br />



          <label style={{ fontWeight: 'bold' }} htmlFor="techSignature">Technician's Signature:</label>
          <button type="button" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} onClick={() => (setShowPopup(true),setsignature_type("techSignature"))} >add signature</button>



          <label style={{ fontWeight: 'bold' }} htmlFor="techDate">Date (MM/DD/YYYY):</label>
          <input type="text" id="techDate" name="techDate" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} value={formData.techDate} onChange={handleInputChange} required /><br />
              
  



        </section>

        <section style={{ margin: '10px 0' }}>
          <h2>Client's Signature</h2>

          <label style={{ fontWeight: 'bold' }} htmlFor="clientSignature">Signature:</label>
          <button type="button" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} onClick={() => (setShowPopup(true),setsignature_type("clientSignature"))} >add signature</button>

          <label style={{ fontWeight: 'bold' }} htmlFor="clientSignatureDate">Date (MM/DD/YYYY):</label>
          <input type="text" id="clientSignatureDate" name="clientSignatureDate" style={{ width: '100%', padding: '5px', marginBottom: '10px', border: '1px solid #ccc' }} value={formData.clientSignatureDate} onChange={handleInputChange} required /><br />
        </section>

        <button type="submit" className='yellowButton py-2 px-8 rounded-3xl font-bold' onClick={handelapi}>Submit</button>
      </form>
      <div className='w-full h-10' >
       
       </div>
    </div>
  );
};

export default ConsentFormGuard;


