import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../assets/tooth-gen.png';
import UserContext from '../context/UserContext';
import { useMediaQuery } from 'react-responsive';
//const { user, setUser } = React.useContext(UserContext);

const ToothGems = () => {
  const { user, setUser } = React.useContext(UserContext);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  var data
  const navigate = useNavigate();
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const canvasRef = useRef(null);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    redrawCanvas();
  }, [selectedTeeth]);

  const handleToothClick = (e) => {

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const selectedTooth = `Tooth at (${x}, ${y})`;

    setSelectedTeeth([...selectedTeeth, { coordinates: { x, y }, label: selectedTooth }]);
  };

  const handleImageUpload = async () => {
 
    const canvas = canvasRef.current;
    const imageBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.5));

    const formData = new FormData();
    formData.append('profile', imageBlob);

    try {
      const response = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        //sessionStorage.setItem('toothgem_url', data.profile_url);
        user.Image=data.profile_url
        navigate('/medical-form');
      } else {
        console.error('Failed to upload image. Server returned:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = Title;
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      selectedTeeth.forEach((tooth) => {
        const { x, y } = tooth.coordinates;
        const size = 5;
        context.beginPath();
        context.moveTo(x, y - size);
        context.lineTo(x + size, y);
        context.lineTo(x, y + size);
        context.lineTo(x - size, y);
        context.closePath();
        context.fillStyle = 'rgba(255, 215, 0, 0.8)';
        context.fill();
      });
    };
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={isMobile ? 300 : 500}
        height={isMobile ? 200 : 300}
        onClick={handleToothClick}
        style={{ border: '1px solid #000' }}
      ></canvas>

      <button
        className={`yellowButton py-2 px-${isMobile ? '2' : '4'} rounded-3xl font-bold mb-2 mr-2`}
        onClick={handleImageUpload}
      >
        Upload
      </button>

      <div>
        <h1>Uploaded image</h1>
        <img src={data} alt="Description of the image" style={{ maxWidth: '100%' }} />
      </div>
    </div>
  );
};

export default ToothGems;
