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
    zIndex?: number;
    onModalClose?: (modalName: string | string[]) => void;
    onModalOpen?: (modalName: string) => void;
    onModalStateChange?: (modalState: boolean, data: TData[], names: string[]) => void;
    ignoreClickClassName?: string;
}
type TData = {
    [key: string]: any;
};
declare const ModalProvider: ({ modalList, isOverflow, className, onModalStateChange, onModalClose, onModalOpen, isHaveBackdrop, isCloseOnBackdropClick, zIndex, ignoreClickClassName, }: ModalProviderProps) => false | React.JSX.Element[];
export default ModalProvider;
