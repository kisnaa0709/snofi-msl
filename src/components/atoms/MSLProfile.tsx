import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import Copy from "../../icons/CopyIcon";
import { useState } from "react";

export default function MSLProfile() {
  let data =
    typeof localStorage != "undefined" && localStorage.zipItem !== undefined
      ? JSON.parse(localStorage.zipItem)
      : null;

  console.log("msl profile", data);

  return (
    <div className="flex items-center px-10 py-5">
      <img
        alt="Profile"
        src={`${data?.image}`}
        width={200}
        height={200}
        className="rounded-full w-[4rem] aspect-square object-cover mr-6"
      />
      <div>
        <p className={`font-[500] text-[0.8rem] text-white `}>{data?.name}</p>
        <p
          className={`cursor-pointer font-[500] relative flex flex-nowrap text-[0.8rem] leading-none items-end mt-2 opacity-90 text-white `}
        >
          <span className="w-full overflow-hidden whitespace-nowrap text-ellipsis">
            {data?.email}
          </span>
          <CopyToClipboard
            text={`${data?.email}`}
            onCopy={() => console.log(data?.email)}
          >
            <span className="copytoclipimg ml-2">
              <Copy />
            </span>
          </CopyToClipboard>
          <span className="hidden copytoclip min-w-max bg-slate-900 text-white p-1 right-[-3rem] top-[-2rem] absolute">
            Copy to clipboard
          </span>
        </p>
      </div>
    </div>
  );
}
