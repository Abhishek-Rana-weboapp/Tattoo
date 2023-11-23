import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

const sectionStyle = {
    marginBottom: '20px',
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#f8f8f8',
  };
  
  const headingStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
  };
  
  const reviewBoxStyle = {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '20px',
    margin: '20px auto',

  };

function MedicalReview() {
  const { formData } = useContext(UserContext);

  return (
    <div style={reviewBoxStyle}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Medical History Review</h1>
      
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Page 1: Have you ever been tattooed before?</h2>
        <p>Answer: {formData.page1.yes ? 'Yes' : 'No'}</p>
      </div>
      
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Page 2: Are you Pregnant or Nursing?</h2>
        <p>Answer: {formData.page2.yes ? 'Yes' : 'No'}</p>
        {formData.page2.yes && (
          <p>Pregnant: {formData.page2.pregnant ? 'Yes' : 'No'}</p>
        )}
        {formData.page2.yes && (
          <p>Nursing: {formData.page2.nursing ? 'Yes' : 'No'}</p>
        )}
      </div>
      
      
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Page 3: Are you a hemophiliac or on any medications that may cause bleeding or hinder blood clotting?</h2>
        <p>Answer: {formData.page3.yes ? 'Yes' : 'No'}</p>
        {formData.page3.yes && (
          <p>Explanation: {formData.page3.explanation}</p>
        )}
      </div>
      
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Page 4: Do you have any medical or skin conditions?</h2>
        <p>Answer: {formData.page4.yes ? 'Yes' : 'No'}</p>
        {formData.page4.yes && (
          <p>Explanation: {formData.page4.explanation}</p>
        )}
      </div>
      
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Page 5: Do you have any communicable diseases?</h2>
        <p>Answer: {formData.page5.yes ? 'Yes' : 'No'}</p>
        {formData.page5.yes && (
          <p>Explanation: {formData.page5.explanation}</p>
        )}
      </div>
      
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Page 6: Are you under the influence of alcohol or drugs, prescribed or otherwise?</h2>
        <p>Answer: {formData.page6.yes ? 'Yes' : 'No'}</p>
        {formData.page6.yes && (
          <p>Explanation: {formData.page6.explanation}</p>
        )}
      </div>
      
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Page 7: Do you have any allergies?</h2>
        <p>Answer: {formData.page7.yes ? 'Yes' : 'No'}</p>
        {formData.page7.yes && (
          <p>Explanation: {formData.page7.explanation}</p>
        )}
      </div>
      
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Page 8: Do you have a heart condition, epilepsy, or diabetes?</h2>
        <p>Answer: {formData.page8.yes ? 'Yes' : 'No'}</p>
        {formData.page8.yes && (
          <p>Explanation: {formData.page8.explanation}</p>
        )}
      </div>
      
    </div>
  );
}

export default MedicalReview;
