import React from "react";

interface InputBoxProps {
    name: string;
    className?: string;
    buttonType?: "button" | "submit" | "reset";
    onClick?: () => void;
}

export default function SubmitButton({ className, name, buttonType, onClick }: InputBoxProps) {
    return (
        <button
            className={`py-2 px-8 bg-[#7A00E6] w-max rounded-full font-normal md:text-[0.9vw] text-[12px] text-[white] border-2 border-transparent tracking-[0.5px] whitespace-nowrap ${className && className}`}
            onClick={onClick}
            type={buttonType || "button"}
            aria-label={name}
        >
            {name}
        </button>
    );
}
export function SubmitButtonV2({ className, name, buttonType, onClick }: InputBoxProps) {
    return (
        <button
            className={`py-2 px-8 bg-[#00000066] w-max rounded-full font-normal md:text-[0.9vw] text-[12px] text-[white] border-2 border-transparent tracking-[0.5px] whitespace-nowrap ${className && className}`}
            onClick={onClick}
            type={buttonType || "button"}
        >
            {name}
        </button>
    );
}

export function BackButton({ className, name, buttonType, onClick }: InputBoxProps) {
    return (
        <button
            className={`py-2 px-8 bg-[#ffffff00] w-max rounded-full font-normal md:text-[0.9vw] text-[12px] text-[white] border-2 border-white ${className && className}`}
            onClick={onClick}
            type={buttonType || "button"}
            aria-label={name}
        >
            {name}
        </button>
    );
}