import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export function SidePanel(props) {
  const { open, handleClose, className, children, setIsOpen, ...rest } = props;
  const base = `fixed inset-0 overflow-hidden z-50`;
  const classes = `${base} ${className}`;
  return (
    <Transition.Root show={open} as={Fragment} {...rest}>
      <Dialog as='div' className={classes} onClose={setIsOpen}>
        <div className='absolute inset-0 overflow-hidden'>
          <Transition.Child
            as={Fragment}
            enter='ease-in-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-500'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='absolute inset-0 bg-black bg-opacity-40 transition-opacity' />
          </Transition.Child>
          {/*// classes below determine position of side-panel */}
          <div className='fixed top-0 bottom-0 right-0 max-w-full flex'>
            <Transition.Child
              as={Fragment}
              enter='transform transition ease-in-out duration-500 sm:duration-700'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transform transition ease-in-out duration-500 sm:duration-700'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'
            >
              {/*// classes below determine width of side-panel */}
              <div className='max-w-80 min-w-80 w-80'>
                <div
                  // style={{ backgroundColor: "#101112" }}
                  className='flex flex-1 flex-col h-full rounded-l-md bg-primary-white pt-4 pb-8 shadow-xl'
                >
                  {children}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
