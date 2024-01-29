import React from "react";
export type ModalList = {
    [key: string]: React.ComponentType;
};
interface ModalProviderProps {
    modalList: any;
    isOverflow?: boolean;
    className?: string;
}
declare const ModalProvider: ({ modalList, isOverflow, className, }: ModalProviderProps) => false | React.JSX.Element[];
export default ModalProvider;
