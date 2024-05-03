import React from "react";
import { FormikErrors, FormikTouched, FormikValues } from "formik";

interface InputBoxProps {
  label: string;
  warningMsg?: string | FormikErrors<any> | string[] | FormikErrors<any>[] | undefined,
  touchedMsg?: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined,
  name?: string,
  value?: string,
  type?: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disableCopy?: boolean;
  disable?: boolean;
  maxLength?: number;
  minLength?: number;
  formik?: FormikValues;
  errorMsg?: string;
}

export default function InputBox({
  label,
  warningMsg,
  name,
  value,
  onChange,
  disableCopy,
  disable,
  maxLength
}: InputBoxProps) {

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    if (disableCopy) {
      event.preventDefault();
    }
  };

  return (
    <div className="items-start flex flex-col py-2 mx-2">
      <label className={`text-sm tracking-[0.5px] leading-[150%] font-[500] md:ml-3 ml-1  text-[rgba(255,255,255,0.7)] whitespace-nowrap uppercase`}>
        {label}
        <span className={`ml-2 text-[#FFE146] tracking-[0.5px] font-[500] text-[12px]`}>
          {`${warningMsg}`}
        </span>
      </label>
      <input
        name={name}
        value={value}
        defaultValue={value}
        onChange={onChange}
        type=""
        onPaste={handlePaste}
        className=" h-[35px] text-[12px] leading-[150%] font-light tracking-[0.5] bg-[white] w-full px-4 py-[3px] pt-[3px] rounded-full text-[black] border-none border-transparent"
        disabled={disable}
        maxLength={maxLength}
      />
    </div>
  );
}

export function InputBoxV2({
  label,
  warningMsg,
  name,
  value,
  onChange,
  disableCopy,
  disable,
  maxLength,
  minLength,
  formik,
  type,
  touchedMsg,
  errorMsg
}: InputBoxProps) {

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    if (disableCopy) {
      event.preventDefault();
    }
  };

  return (
    <div className="items-start flex flex-col py-2 mx-2">
      <label className={`text-[10px] tracking-[0.5px] leading-[150%] font-[600] md:ml-3 ml-1  text-[#ffffffbe] whitespace-nowrap `}>
        {label}
        <span className={`ml-2 text-[#FFE146] tracking-[0.5px]  font-[500] text-[12px]`}>
          {`${warningMsg || errorMsg}`}
        </span>
      </label>
      <input
        name={name}
        defaultValue={formik && formik.values.zipCode}
        type={'text'}
        onPaste={handlePaste}
        className="border-2 border-[#c9a7e796] h-[28px] text-[12px] leading-[150%] font-light tracking-[0.5] bg-[white] w-full px-4 py-[3px] pt-[3px] rounded-full text-[black]"
        disabled={disable}
        maxLength={maxLength}
        minLength={minLength}
        value={formik && formik.values.zipCode}
        onChange={formik && formik.handleChange}
        pattern="^\d{5}$"
        required
      />
      <p className={`md:text-[9px] text-[13px] tracking-[0.5px] leading-[150%] font-[600] md:ml-3 ml-1  text-[#ffffffbe] whitespace-nowrap mt-1 `}>Must be 5 characters long</p>
    </div>
  );
}