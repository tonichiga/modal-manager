import React from "react";
export type ModalList = {
    [key: string]: React.ComponentType<any>;
};
interface ModalProviderProps {
    modalList: ModalList;
    isOverflow?: boolean;
    className?: string;
    backdropClassName?: string;
    onModalStateChange?: (modalState: boolean, data: ModalData[], names: string[]) => void;
}
type ModalData = {
    id: string;
    name: string;
    payload: any;
    options?: any;
};
declare const ModalProvider: React.FC<ModalProviderProps>;
export default ModalProvider;
