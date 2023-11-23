import React, { useState } from 'react';
import axios from 'axios';

const BillingComponent = () => {
  const [billingData, setBillingData] = useState({
    username: '',
    price: 0,
    fix: 'yes',
    before_image: '',
    after_image: '',
    start_time: '',
    end_time: ''
  });

  const [uploadedImages, setUploadedImages] = useState({
    before_image: null,
    after_image: null
  });

  const [finalPrice, setFinalPrice] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageUpload = (imagePath, type) => {
    axios.post('http://localhost:3000/upload', { profileImage: imagePath })
      .then(response => {
        const imageUrl = response.data.url;
        setBillingData(prevData => ({
          ...prevData,
          [type]: imageUrl
        }));

        // Display uploaded image
        setUploadedImages(prevImages => ({
          ...prevImages,
          [type]: imageUrl
        }));
      })
      .catch(error => {
        // Handle image upload error
      });
  };

  const handleBillingSubmit = () => {
    axios.post('http://localhost:3000/artist/calculate-billing', billingData)
      .then(billingResponse => {
        // Handle billing response
        console.log('Billing response:', billingResponse.data);
        setFinalPrice(billingResponse.data.finalPrice);
      })
      .catch(error => {
        // Handle billing error
        console.error('Billing error:', error);
      });
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <label>
        Username:
        <input type="text" name="username" value={billingData.username} onChange={handleInputChange} placeholder="Username" />
      </label>

      <label>
        Price:
        <input type="number" name="price" value={billingData.price} onChange={handleInputChange} placeholder="Price" />
      </label>

      <label>
        Fix Price:
        <select name="fix" value={billingData.fix} onChange={handleInputChange}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>

      {/* Image upload for before */}
      <label>
        Before Image:
        <input type="file" onChange={(e) => handleImageUpload(e.target.files[0], 'before_image')} />
        {uploadedImages.before_image && <img src={uploadedImages.before_image} alt="Before" style={{ width: '100%', marginTop: '5px' }} />}
      </label>

      {/* Image upload for after */}
      <label>
        After Image:
        <input type="file" onChange={(e) => handleImageUpload(e.target.files[0], 'after_image')} />
        {uploadedImages.after_image && <img src={uploadedImages.after_image} alt="After" style={{ width: '100%', marginTop: '5px' }} />}
      </label>

      {/* Start date-time */}
      <label>
        Start Time:
        <input type="datetime-local" name="start_time" value={billingData.start_time} onChange={handleInputChange} />
      </label>

      {/* End date-time */}
      <label>
        End Time:
        <input type="datetime-local" name="end_time" value={billingData.end_time} onChange={handleInputChange} />
      </label>

      <button style={{ marginTop: '10px', padding: '8px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={handleBillingSubmit}>Calculate</button>

      {finalPrice !== null && (
        <div style={{ marginTop: '10px', backgroundColor: '#DFF2BF', padding: '10px', borderRadius: '4px' }}>
          <p>Final Price:</p>
          <strong>${finalPrice}</strong>
        </div>
      )}
    </div>
  );
};

export default BillingComponent;
