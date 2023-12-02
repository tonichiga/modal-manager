import React, { useEffect, useRef, useState } from "react";
import manager from "../utils/service/ModalManager";
import modal from "../utils/service/ModalManager";
import modalList from "../utils/config/modal-list";

interface ModalProviderProps {
  CustomComponent?: React.ComponentType;
}

type TData = { [key: string]: any };

const ModalProvider = ({ CustomComponent }: ModalProviderProps) => {
  const [data, setData] = useState<TData[]>([]);
  const [names, setNames] = useState<string[]>([]);
  const modalRef = useRef<any[]>([]);

  useEffect(() => {
    const handleOpenModal = (name: string, data: TData) => {
      setData((prev: TData[]) => [...prev, data]);
      setNames((prev: string[]) => [...prev, name]);
    };

    const handleClose = (position: number | string) => {
      if (position === "all") {
        setData([]);
        setNames([]);
        return;
      }

      if (position === -1) {
        // remove last
        setData((prev: TData[]) =>
          prev.filter((_, index) => index !== prev.length - 1)
        );
        setNames((prev: string[]) =>
          prev.filter((_, index) => index !== prev.length - 1)
        );
        return;
      }

      if (position === 0) {
        // remove first
        setData((prev: TData[]) => prev.filter((_, index) => index !== 0));
        setNames((prev: string[]) => prev.filter((_, index) => index !== 0));
        return;
      }

      // remove position index
      setData((prev: TData[]) =>
        prev.filter((_, index) => index !== prev.length - 1)
      );
      setNames((prev: string[]) =>
        prev.filter((_, index) => index !== prev.length - 1)
      );
    };

    manager.addEventListener("change", handleOpenModal);
    manager.addEventListener("close", handleClose);
    return () => {
      manager.removeEventListener("change", handleOpenModal);
      manager.removeEventListener("close", handleClose);
    };
  }, []);

  const activeModals = names.map((name: string) => {
    const Component = modalList[name] || (() => <></>);
    return Component;
  });

  const handleCloseModal = (index: number, e: any) => {
    if (
      modalRef.current[index] &&
      !modalRef.current[index].contains(e.target)
    ) {
      modal.close(index);
    }
  };

  const refReducer = (index: number, value: any) => {
    modalRef.current[index] = value;
  };

  return (
    activeModals.length !== 0 &&
    activeModals.map((Component, i) => {
      const Modal = Component;

      return (
        <>
          {CustomComponent ? (
            <CustomComponent key={i} {...data[i]} />
          ) : (
            <div
              key={i}
              className="backdrop_modal_manager"
              onClick={(e) => {
                handleCloseModal(i, e);
              }}
            >
              <div
                ref={(ref) => {
                  refReducer(i, ref);
                }}
              >
                <Modal key={i} {...data[i]} />
              </div>
            </div>
          )}
        </>
      );
    })
  );
};

export default ModalProvider;
