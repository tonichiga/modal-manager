"use client";

import React, { useEffect, useRef, useState } from "react";
import modal, { constants } from "../utils/ModalManager";

export type ModalList = { [key: string]: React.ComponentType };

interface ModalProviderProps {
  modalList: any;
  isOverflow?: boolean;
  className?: string;
  backdropClassName?: string;
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
  backdropClassName,
  onModalStateChange,
}: ModalProviderProps) => {
  const [data, setData] = useState<TData[]>([]);
  const [names, setNames] = useState<string[]>([]);
  const modalRef = useRef<any[]>([]);

  const applyCloseStyles = (index: number) => {
    return new Promise((resolve) => {
      const modal = document.querySelector(
        `[data-index="${index}"]`
      ) as HTMLElement;
      if (!modal) return;
      modal.classList.add("closing");
      setTimeout(() => {
        resolve(true);
      }, 150);
    });
  };

  useEffect(() => {
    if (!onModalStateChange) return;
    const modalState = data.length !== 0;
    onModalStateChange(modalState, data, names);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const handleClose = async (position: number | string) => {
      await applyCloseStyles(position as number);
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

    modal.addEventListener(constants.CHANGE, handleOpenModal);
    modal.addEventListener(constants.CLOSE, handleClose);
    return () => {
      modal.removeEventListener(constants.CHANGE, handleOpenModal);
      modal.removeEventListener(constants.CLOSE, handleClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeModals = names.map((name: string) => {
    const Component = modalList[name] || (() => <></>);
    return Component;
  });

  const handleCloseModal = (index: number) => {
    modal.close(index);
  };

  const refReducer = (index: number, value: any) => {
    modalRef.current[index] = value;
  };

  return (
    <>
      {data.length !== 0 &&
        data.map((item, i) => {
          const Modal = activeModals[i] || (() => <></>);

          return (
            <div
              data-index={i}
              key={item.modalId}
              className={`modal-manager backdrop_modal_manager ${backdropClassName}`}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseModal(i);
                }}
                className="backdrop"
              />
              {/* // h-full modal not close */}
              <div className={`${className} modal_paper`}>
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
        })}
    </>
  );
};

export default ModalProvider;
