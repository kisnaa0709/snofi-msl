import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function PopupWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(true);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="absolute min-h-screen w-screen p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="mslLocator w-[23rem] bg-[#7A00E6] z-[1000001] rounded-[.375rem] m-auto portrait:mt-[80px] landscape:mt-[100px] mr-2 md:mr-[3vw] relative">
                {children}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
