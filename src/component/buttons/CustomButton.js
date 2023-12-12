import React from "react";

export default function CustomButton({ children, onClick, def, maxWidth, selected, value }) {
  const activeColor = `bg-gradient-to-b from-white to-yellow-400 to-10%`;
  const color = `bg-[#e8e2e3]`;

  const dynamicPadding = `${children.split(" ").length > 1 ? "py-2" : "py-2"}`; // Adjust this condition as needed

  return (
    <button
      ref={def}
      className={`${selected === children ? activeColor : color} w-full max-w-[${maxWidth}] ${dynamicPadding} px-2 uppercase md:text-2xl text-sm
      font-bold rounded-lg hover:bg-gradient-to-b from-white to-yellow-400 to-10% select-none`}
      onClick={() => onClick(value ? value : children)}
    >
      {children.split("-")?.join(" ")}
    </button>
  );
}
