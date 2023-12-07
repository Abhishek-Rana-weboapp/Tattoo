import React from "react";

export default function CustomButton({ children, onClick, def , maxWidth , selected , value }) {

  const activeColor = `bg-gradient-to-b from-white  to-yellow-400  to-10%`
  const color = `bg-[#e8e2e3]`
  console.log(children)

  return (
    <button
      ref={def}
      className={`${selected === children ? activeColor : color } w-[${maxWidth}] py-2 px-2 uppercase md:text-2xl text-md flex-1
    font-bold rounded-lg hover:bg-gradient-to-b from-white  to-yellow-400  to-10% select-none `}
      onClick={() => onClick(value ? value : children)}
    >
      {children.split("-")?.join(" ")}
    </button>
  );
}
