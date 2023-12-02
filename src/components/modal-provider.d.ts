import React from "react";
interface ModalProviderProps {
    CustomComponent?: React.ComponentType;
}
declare const ModalProvider: ({ CustomComponent }: ModalProviderProps) => false | React.JSX.Element[];
export default ModalProvider;
