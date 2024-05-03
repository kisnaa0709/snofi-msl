import React from "react";
import CloseIcon from "../icons/CloseIcon";
import MSLProfile from "../components/atoms/MSLProfile";
import PopupWrapper from "../components/atoms/popupWapper";

type Props = {
  onClose?: () => void;
};

export default function MSLocator({ onClose }: Props) {
  let data =
    typeof localStorage != "undefined" && localStorage.zipItem !== undefined
      ? JSON.parse(localStorage.zipItem)
      : null;

  function sendEmail(email: string) {
    console.log("Clicked");
    var email = email;
    var subject = "";
    var emailBody = "";
    document.location =
      "mailto:" + email + "?subject=" + subject + "&body=" + emailBody;
  }

  return (
    <PopupWrapper>
      <div className="flex justify-end px-3">
        <div
          className="h-auto cursor-pointer p-2 w-[1.75rem] absolute right-2 top-2 z-20"
          onClick={onClose}
        >
          <CloseIcon />
        </div>
      </div>
      <p
        className={`text-[0.8rem] mb-[0.75rem] text-center text-white opacity-90  mt-2`}
      >
        MSL Locator
      </p>
      <p
        className={`font-light text-[0.8rem] text-center text-white opacity-70 `}
      >
        For your zip code area, please contact:
      </p>
      <MSLProfile />
      <div className="flex justify-center items-center pb-7">
        <p
          onClick={() => sendEmail(data?.email)}
          className={`cursor-pointer text-base flex justify-center items-center tracking-[0.5px] text-white bg-[#00000040] w-[40%] py-2 rounded-[39px]  text-[0.75rem] font-[600]`}
          aria-label="Open mail to window to email MSL"
        >
          Contact MSL
        </p>
      </div>
    </PopupWrapper>
  );
}
