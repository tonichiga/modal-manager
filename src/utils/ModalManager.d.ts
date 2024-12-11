import Manager from "./Manager";
export declare const constants: {
    CHANGE: string;
    CLOSE: string;
};
interface QueueState {
    queue: string[];
    closedModalName?: string | undefined;
    lastOpenedModal?: string | undefined;
}
interface ModalState {
    isHaveOpenModals: boolean;
    queue: string[];
    closedModalName?: string | undefined;
    lastOpenedModal?: string | undefined;
}
export interface Options {
    hideBackdrop?: boolean;
    extraClass?: string;
    openMinimized?: boolean;
}
export declare class ModalManager extends Manager {
    queue: string[];
    _openModalStateCallback: null | ((props: ModalState) => void);
    constructor();
    create<T>(name: string, payload: {
        modalId: number;
        data?: T;
    }, options?: Options): void;
    call<T>(name: string, data?: T, options?: Options): void;
    close<T>(position?: T): void;
    getQueueState({ queue, closedModalName, lastOpenedModal }: QueueState): {
        isHaveOpenModals: boolean;
        queue: string[];
        lastOpenedModal: string | undefined;
        closedModalName: string | undefined;
    };
    onOpenModalState(callback: (state: ModalState) => void): void;
}
declare const modal: ModalManager;
export default modal;
