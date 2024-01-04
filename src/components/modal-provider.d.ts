import React from "react";
export type ModalList = {
    [key: string]: React.ComponentType;
};
interface ModalProviderProps {
    modalList: any;
}
declare const ModalProvider: ({ modalList }: ModalProviderProps) => false | React.JSX.Element[];
export default ModalProvider;
