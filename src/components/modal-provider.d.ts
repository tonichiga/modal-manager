import React from "react";
export type ModalList = {
    [key: string]: React.ComponentType;
};
interface ModalProviderProps {
    modalList: any;
    isOverflow?: boolean;
    className?: string;
    backdropClassName?: string;
    onModalStateChange?: (modalState: boolean, data: TData[], names: string[]) => void;
}
type TData = {
    [key: string]: any;
};
declare const ModalProvider: ({ modalList, isOverflow, className, backdropClassName, onModalStateChange, }: ModalProviderProps) => React.JSX.Element;
export default ModalProvider;
