import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function DisplayCard({
  onClick,
  data
}) {

  const [isHovered, setIsHovered] = useState(false);

  return (
      <NavLink
        to={data.link}
        className={`flex flex-col items-center gap-2 h-full w-full md:text-3xl text-md capitalize font-bold text-white overflow`}
        onClick={() => onClick(data.type)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ textDecoration: "none" }}
      >
        <img src={isHovered ? data.activesrc : data.src} className="rounded-xl md:w-32 md:h-32" alt={`${data.type}-image`} />
        {data.name}
      </NavLink>
  );
}
