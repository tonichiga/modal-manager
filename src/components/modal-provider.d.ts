import React from "react";
type ModalList = {
    [key: string]: React.ComponentType;
};
interface ModalProviderProps {
    CustomComponent?: React.ComponentType;
    modalList: ModalList;
}
declare const ModalProvider: ({ CustomComponent, modalList }: ModalProviderProps) => false | React.JSX.Element[];
export default ModalProvider;
