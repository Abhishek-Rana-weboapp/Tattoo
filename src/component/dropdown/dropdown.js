
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";

const ProfileDropdown = ({logout}) => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const ref = useRef(null);

  // close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setDropdownActive(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <div
        className="flex items-center gap-2 cursor-pointer md:text-lg text-sm group"
        onClick={(e) => {
          e.stopPropagation();
          setDropdownActive((prev) => !prev);
        }}
      >
        {/* <User className="md:size-6 size-5 group-hover:text-primary-500 transition-colors" /> */}
        <span className="text-base capitalize group-hover:text-primary-500 transition-colors">
        <IoMdMenu className=" text-yellow-500 sm:size-7 size-7" />
        </span>
      </div>

      {/* Dropdown */}
      <MenuList open={dropdownActive} logout={logout} />
    </div>
  );
};

export default ProfileDropdown;



const MenuList = ({ open , logout}) => {

  return (
    <div
      className={`
        absolute top-full right-0 mt-2 w-max z-20
        bg-white shadow-lg rounded-md p-1
        transition-all duration-200 ease-out
        ${open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"}
      `}
    >
      <NavLink
          to="/artist-dashboard"
          className="block mb-2 text-gray-700 hover:bg-yellow-500 hover:text-white p-2 py-1 rounded-md"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/employee-list"
          className="block mb-2 text-gray-700 hover:bg-yellow-500 hover:text-white p-2 py-1 rounded-md"
        >
          Employee List
        </NavLink>

        <NavLink
          to={
           "/client-list"
          }
          className="block mb-2 text-gray-700 hover:bg-yellow-500 hover:text-white p-2 py-1 rounded-md"
        >
          Client List
        </NavLink>

        <NavLink to={"shoplocation-list"}  className="block mb-2 text-gray-700 hover:bg-yellow-500 hover:text-white p-2 py-1 rounded-md">Shop Locations</NavLink>

      <button
        onClick={logout}
        className="block w-full text-left text-gray-700 hover:bg-red-500 hover:text-white p-2 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};
