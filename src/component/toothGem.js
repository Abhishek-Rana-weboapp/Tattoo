import React, { useState, useRef, useEffect } from 'react';
import Title from '../assets/tooth-gen.png';
import { json, useLocation, useNavigate } from 'react-router-dom';

const ToothGems = () => {
    const navigate = useNavigate();
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [canvasImageUrl, setCanvasImageUrl] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    redrawCanvas();
  }, [selectedTeeth]);

  const handleToothClick = (e) => {
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Simulate logic to map coordinates to tooth numbers
    const selectedTooth = `Tooth at (${x}, ${y})`;

    // Add the selected tooth to the array
    setSelectedTeeth([...selectedTeeth, { coordinates: { x, y }, label: selectedTooth }]);
  };

  const handleImageUpload = () => {
    const canvas = canvasRef.current;

    // Convert canvas to data URL with JPEG format and lower quality (e.g., 0.5)
    const imageUrl = canvas.toDataURL('image/jpeg', 0.5);

    // Log the data URL to the console
    console.log('Canvas Data URL:', imageUrl);

    // Set the data URL to state for display (optional)
    setCanvasImageUrl(imageUrl);
    navigate('/medical-form')
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw the entire image
    const image = new Image();
    image.src = Title;
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Draw a highlighted diamond shape for each selected tooth
      selectedTeeth.forEach((tooth) => {
        const { x, y } = tooth.coordinates;
        const size = 5; // Adjust the size of the diamond
        context.beginPath();
        context.moveTo(x, y - size); // Top point
        context.lineTo(x + size, y); // Right point
        context.lineTo(x, y + size); // Bottom point
        context.lineTo(x - size, y); // Left point
        context.closePath();
        context.fillStyle = 'rgba(255, 215, 0, 0.8)'; // Golden color with transparency
        context.fill();
      });
    };
  };

  return (
    <div>
      {/* Display selected tooth information */}
      {selectedTeeth.length > 0 && (
        <p>
          Selected Teeth:{' '}
          
        </p>
      )}

      {/* Canvas for drawing */}
      <canvas
        ref={canvasRef}
        width={500}
        height={300}
        onClick={handleToothClick}
        style={{ border: '1px solid #000' }}
      ></canvas>

      {/* Button to get the canvas data URL */}
      <button className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2" onClick={handleImageUpload}>Upload</button>

      {/* Display the canvas data URL (optional) */}
      {canvasImageUrl && (
        <div>
          
        </div>
      )}
    </div>
  );
};

export default ToothGems;
