import React from "react";

export default function CustomButton({ children, onClick, def , maxWidth , selected }) {

  const activeColor = `bg-gradient-to-b from-white  to-yellow-400  to-10%`
  const color = `bg-[#e8e2e3]`

  return (
    <button
      ref={def}
      className={`${selected === children ? activeColor : color } w-[${maxWidth}] py-2 px-2 uppercase md:text-2xl text-md flex-1
    font-bold rounded-lg hover:bg-gradient-to-b from-white  to-yellow-400  to-10% select-none `}
      onClick={() => onClick(children)}
    >
      {children.split("-").join(" ")}
    </button>
  );
}
