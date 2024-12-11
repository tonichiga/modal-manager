import React from "react";
import { ModalManager } from "../utils/ModalManager";
export type ModalList = {
    [key: string]: React.ComponentType;
};
interface ModalProviderProps {
    modalList: any;
    isOverflow?: boolean;
    className?: string;
    backdropClassName?: string;
    modalManager?: ModalManager;
    onModalStateChange?: (modalState: boolean, data: TData[], names: string[]) => void;
}
type TData = {
    [key: string]: any;
};
declare const ModalProvider: ({ modalList, isOverflow, className, backdropClassName, modalManager, onModalStateChange, }: ModalProviderProps) => React.JSX.Element;
export default ModalProvider;
