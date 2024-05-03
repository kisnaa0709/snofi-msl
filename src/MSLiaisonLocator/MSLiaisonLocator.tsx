import React from "react";
import * as Yup from "yup";
import PopupWrapper from "../components/atoms/popupWapper";
import { useFormik } from "formik";
import { InputBoxV2 } from "../components/atoms/InputBox";
import { SubmitButtonV2 } from "../components/atoms/SubmitButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../icons/CloseIcon";

type Props = {
  onClose: Function;
  search: Function;
  errorMsg?: string;
};

export default function MSLiaisonLocator({ onClose, search, errorMsg }: Props) {
  const navigate = useNavigate();
  // const [error, setError] = useState(errorMsg)

  const zipCodeSchema = Yup.object({
    zipCode: Yup.string()
      .min(5, "Invalid ZIP code")
      .matches(/[0-9]/, "Must be 5 digit long")
      .required(" ")
      .max(99999),
  });

  const formik = useFormik({
    initialValues: {
      zipCode: null,
    },
    enableReinitialize: true,
    validationSchema: zipCodeSchema,
    onSubmit: (values: any) => {
      search(values);
    },
  });

  const handleSignIn = () => {
    navigate("/sign-in");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <PopupWrapper>
      <div className="flex justify-end px-3">
      <div
          className="h-auto cursor-pointer p-2 w-[1.75rem] absolute right-2 top-2 z-20"
          onClick={()=>onClose()}
        >
          <CloseIcon />
        </div>
      </div>
      <p
        className={`font-[600] text-[12px] leading-relaxed tracking-wider text-center text-white pb-2 pt-8 px-5 `}
      >
        Medical Science Liaison Locator
      </p>
      <p className={` font-thin text-[14px] text-center text-white px-5 `}>
        Enter your ZIP code to find your MSL
      </p>

      <form
        className="p-5 pt-1 mx-4 flex justify-center flex-col"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <InputBoxV2
          label={"ZIP CODE"}
          errorMsg={errorMsg}
          name="zipCode"
          type="text"
          warningMsg={formik.errors.zipCode}
          touchedMsg={formik.touched.zipCode}
          formik={formik}
          maxLength={5}
          minLength={5}
        />
        <SubmitButtonV2 name="Search" buttonType="submit" className="mx-auto" />
      </form>

      <div className="font-light text-base flex justify-center items-center tracking-[0.5px] text-white bg-[#00000040] w-full py-4   gap-1 cursor-pointer">
        <a
          className="underline text-[0.78rem] font-[500] cursor-pointer leading-relaxed tracking-wide"
          onClick={handleRegister}
        >
          Register
        </a>
        <p className="te text-[0.78rem]">or</p>
        <a
          className="underline text-[0.78rem] font-[500] cursor-pointer leading-relaxed tracking-wide"
          onClick={handleSignIn}
        >
          Sign in
        </a>
      </div>
    </PopupWrapper>
  );
}
