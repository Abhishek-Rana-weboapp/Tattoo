import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../assets/tooth-gen.png';

const ToothGems = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;// Replace with your actual API URL
  const navigate = useNavigate();
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const canvasRef = useRef(null);

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
    formData.append('profile', imageBlob); // Use 'profile' as the field name
  
    try {
      const response = await fetch(`http://localhost:3000/upload`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        //navigate('/medical-form');
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
        width={500}
        height={300}
        onClick={handleToothClick}
        style={{ border: '1px solid #000' }}
      ></canvas>

      <button
        className="yellowButton py-2 px-4 rounded-3xl font-bold mb-2 mr-2"
        onClick={handleImageUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default ToothGems;
