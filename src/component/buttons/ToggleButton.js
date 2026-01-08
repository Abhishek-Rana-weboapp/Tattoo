import React from "react";

const ToggleButton = ({children, checked, ...props }) => {
  return (
    <>
      <label class="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          class="sr-only peer"
          checked={checked}
          {...props}
        />
        <div class={`relative w-9 h-5 ${checked ? "bg-yellow-400" : "bg-gray-400"} peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand`}></div>
        <span class="select-none ms-3 text-sm font-medium text-heading">
          {children}
        </span>
      </label>
    </>
  );
};

export default ToggleButton;
