import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';


function SkinCondition({onClick}) {
  const [explanation, setExplanation] = useState('');
  const [signature, setSignature] = useState(null);
  const {setIsVisible} = useContext(UserContext)

  useEffect(()=>{
   setIsVisible(true)
  },[])


  return (
    <div className='flex flex-col gap-2 items-center '>
        <div className='w-full flex flex-col gap-3 items-center'>
          <label className='text-white'>Explain the skin condition :</label>
          <textarea
            className='w-full h-28 md:w-96 rounded-xl p-2 text-black'
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        <div>
          <button className='yellowButton rounded-xl py-2 px-4 font-bold text-black' onClick={()=>onClick(explanation, "skin_conditions")}>Update Skin Condition</button>
        </div>
        </div>
    </div>
  );
}

export default SkinCondition;
