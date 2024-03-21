import React, { useEffect, useRef, useState } from "react";
import manager from "../utils/ModalManager";
import modal from "../utils/ModalManager";

export type ModalList = { [key: string]: React.ComponentType };

interface ModalProviderProps {
  modalList: any;
  isOverflow?: boolean;
  className?: string;
  onModalStateChange?: (
    modalState: boolean,
    data: TData[],
    names: string[]
  ) => void;
}

type TData = { [key: string]: any };

const ModalProvider = ({
  modalList,
  isOverflow,
  className,
  onModalStateChange,
}: ModalProviderProps) => {
  const [data, setData] = useState<TData[]>([]);
  const [names, setNames] = useState<string[]>([]);
  const modalRef = useRef<any[]>([]);

  useEffect(() => {
    if (!onModalStateChange) return;
    const modalState = data.length !== 0;
    onModalStateChange(modalState, data, names);
  }, [data, names]);

  useEffect(() => {
    const handleOpenModal = (name: string, data: TData) => {
      setData((prev: TData[]) => [...prev, data]);
      setNames((prev: string[]) => [...prev, name]);

      if (isOverflow) {
        if (typeof document === "undefined") return;
        document.body.style.overflow = "hidden";
      }
    };

    const handleClose = (position: number | string) => {
      if (isOverflow) {
        if (typeof document !== "undefined") {
          document.body.style.overflow = "";
        }
      }

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
    data.length !== 0 &&
    data.map((item, i) => {
      const Modal = activeModals[i] || (() => <></>);

      return (
        <div
          key={item.modalId}
          onMouseUp={(e) => {
            handleCloseModal(i, e);
          }}
        >
          <div className={`${className} backdrop_modal_manager`}>
            <div
              ref={(ref) => {
                refReducer(i, ref);
              }}
            >
              <Modal {...item.data} />
            </div>
          </div>
        </div>
      );
    })
  );
};

export default ModalProvider;
