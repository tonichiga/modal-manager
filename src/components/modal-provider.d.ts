import React from "react";
import "./backdrop.css";
interface ModalProviderProps {
    CustomComponent?: React.ComponentType;
}
declare const ModalProvider: ({ CustomComponent }: ModalProviderProps) => false | React.JSX.Element[];
export default ModalProvider;
