import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";

function SkinCondition({ onClick, handlePrev }) {

  const [condition, setCondition] = useState();
  const [explanation, setExplanation] = useState("");
  const { setIsVisible } = useContext(UserContext);

  useEffect(() => {
    setIsVisible(true);
    
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center w-full ">
      <div className="w-full flex flex-col gap-3 items-center">
        <h3>Please Select Skin Condition</h3>
        <select className="p-2 rounded-lg md:w-2/4 w-full text-black font-semibold" value={condition} onChange={(e)=>setCondition(e.target.value)}>
          <option value={""}>Select</option>
          <option value={"good"}>Good</option>
          <option value={"bad"}>Bad</option>
        </select>
        {condition === "bad" && (
          <>
            <h5 className="text-white">Explain the skin condition :</h5>
            <textarea
              className="w-full h-28 md:w-2/4 rounded-xl p-2 text-black"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />
          </>
        )}
        <div className="flex gap-5 items-center">
        <button
            className="yellowButton rounded-xl py-2 px-4 font-bold text-black"
            onClick={handlePrev}
          >
            Prev
          </button>
          <button
            className="yellowButton rounded-xl py-2 px-4 font-bold text-black"
            onClick={() => onClick(condition, explanation, "skin_conditions")}
          >
            Update Skin Condition
          </button>
        </div>

      </div>
    </div>
  );
}

export default SkinCondition;
