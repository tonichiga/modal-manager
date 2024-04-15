import React from "react";
export type ModalList = {
    [key: string]: React.ComponentType;
};
interface ModalProviderProps {
    modalList: any;
    isOverflow?: boolean;
    className?: string;
    isHaveBackdrop?: boolean;
    isCloseOnBackdropClick?: boolean;
    onModalClose?: (modalName: string | string[]) => void;
    onModalOpen?: (modalName: string) => void;
    onModalStateChange?: (modalState: boolean, data: TData[], names: string[]) => void;
}
type TData = {
    [key: string]: any;
};
declare const ModalProvider: ({ modalList, isOverflow, className, onModalStateChange, onModalClose, onModalOpen, isHaveBackdrop, isCloseOnBackdropClick, }: ModalProviderProps) => false | React.JSX.Element[];
export default ModalProvider;
