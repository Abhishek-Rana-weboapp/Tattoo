import React, { useState } from 'react'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

const PinInput = ({value, onChange,className, ref}) => {
    const [inputValue, setInputValue] = useState(value);
    const [showPassword, setShowPassword] = useState(false)

    const handleInputChange = (event) => {
      const inputValue = event.target.value;
      if (/^\d*$/.test(inputValue)) {
        setInputValue(inputValue);
        onChange(inputValue);
      }
    };
  
    return (
      <>
      <div className="flex gap-3 bg-white text-black p-2 rounded-2xl items-center">
      <input
        ref={ref}
        className="outline-none p-1"
        type={showPassword ? "text":"password"}
        value={inputValue}
        inputMode='numeric'
        onChange={handleInputChange}
        />

         {showPassword ? (
           <RiEyeOffFill
           size={20}
           onClick={() => setShowPassword(!showPassword)}
           />
          ) : (
            <RiEyeFill
            size={20}

            onClick={() => setShowPassword(!showPassword)}
            />
          )}
          </div>
      </>
    );
  };

export default PinInput
