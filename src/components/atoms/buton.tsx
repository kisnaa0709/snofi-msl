import React, { ReactElement, useState } from "react";
import MessageIcon from "../../icons/MessageIcon";

interface Props {
  label?: string;
  icon?: ReactElement;
  setShowMSL: React.Dispatch<React.SetStateAction<boolean>>;
}
 const Button = ({ label, icon, setShowMSL }: Props) => {

  return (
    <button
      onClick={() => setShowMSL(true)}
      className="relative w-max"
      aria-label="My MSL"
    >
      <div
        className={`flex items-end justify-center landscape:hidden text-white bg-[#7A00E6] rounded-full px-[1rem] py-3 z-[10]`}
      >
        <div className="w-[1.5rem] mr-[.5rem]">
          {icon ? icon : <MessageIcon />}
        </div>
        <p className="leading-none text-[1.2rem]">{label ? label : "My MSL"}</p>
      </div>
      <div className="landscape:hidden animate-ping rounded-full w-[100%] -z-10 h-[100%] bg-[#7A00E6] absolute right-0 top-0"></div>
    </button>
  );
};

export default Button;
