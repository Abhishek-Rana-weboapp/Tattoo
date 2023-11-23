import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = () => {
  const signatureRef = useRef(null);
  const [signatureImage, setSignatureImage] = useState(null);

  const handleClear = () => {
    signatureRef.current.clear();
    setSignatureImage(null);
  };

  const handleSave = () => {
    const dataUrl = signatureRef.current.toDataURL();
    setSignatureImage(dataUrl);
  };

  const handleSubmit = () => {
    // You can now use the signatureImage state to submit the signature to your API
    if (signatureImage) {
      console.log('Submitting Signature:', signatureImage);
      // Add your API submission logic here
    } else {
      console.log('Please save a signature before submitting.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px solid #3498db', padding: '20px', borderRadius: '10px', maxWidth: '400px', margin: 'auto', marginTop: '50px', backgroundColor: '#ecf0f1' }}>
      <SignatureCanvas
        penColor="black"
        canvasProps={{ width: 300, height: 150, className: 'sigCanvas', style: { border: '1px solid #000', backgroundColor: 'white' } }}
        ref={signatureRef}
      />
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
        <button style={{ background: '#e74c3c', color: 'white', padding: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer', marginRight: '10px' }} onClick={handleClear}>Clear</button>
        <button style={{ background: '#2ecc71', color: 'white', padding: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer' }} onClick={handleSave}>Save</button>
      </div>

      {signatureImage && (
        <div style={{ marginTop: '20px' }}>
          <img src={signatureImage} alt="Signature Preview" style={{ border: '1px solid #000', borderRadius: '5px', maxWidth: '100%' }} />
        </div>
      )}

      {signatureImage && (
        <button style={{ marginTop: '10px', padding: '8px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={handleSubmit}>
          Submit Signature
        </button>
      )}
    </div>
  );
};

export default SignaturePad;
