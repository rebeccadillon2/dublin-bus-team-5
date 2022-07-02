import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { useTheme } from "../../hooks";

export function Modal(props) {
  const { children, modalOpen, setModalOpen, ...rest } = props;
  const [isDarkMode] = useTheme();

  return (
    <Transition.Root show={modalOpen} as={Fragment} {...rest}>
      <Dialog as='div' className='relative z-10' onClose={setModalOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div
            className={`fixed inset-0 ${
              isDarkMode ? "bg-system-grey6" : "bg-system-grey4"
            } bg-opacity-75 transition-opacity`}
          />
        </Transition.Child>

        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-end items-center justify-center min-h-full p-4 text-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel
                className={`relative ${
                  isDarkMode ? "bg-primary-black" : "bg-primary-white"
                }  rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6 max-w-120`}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
