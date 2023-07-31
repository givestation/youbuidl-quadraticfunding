import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Modals = ({ children, showModal, setShowModal, classes }) => {
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog
        as="div"
        onClose={setShowModal}
        className={`w-full fixed top-0 left-0 right-0 bottom-0 bg-[#1111128A] z-50 flex justify-center items-center ${
          classes && classes
        }`}
      >
        <div className="px-4    ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div>{children}</div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modals;
