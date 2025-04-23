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
    onClickBackdrop?: (cb: () => void) => void;
}
export declare class ModalManager extends Manager {
    queue: string[];
    modalData: Map<string, any>;
    _openModalStateCallback: null | ((props: ModalState) => void);
    constructor();
    create<T>(name: string, payload: {
        modalId: number;
        data?: T;
    }, options?: Options): string;
    call: <T>(name: string, data?: T | undefined, options?: Options) => string;
    close: <T>(position?: T | undefined) => void;
    getQueueState({ queue, closedModalName, lastOpenedModal }: QueueState): {
        isHaveOpenModals: boolean;
        queue: string[];
        lastOpenedModal: string | undefined;
        closedModalName: string | undefined;
    };
    onOpenModalState(callback: (state: ModalState) => void): void;
    getModalCount(): number;
    closeAll(): void;
}
declare const modal: ModalManager;
export { modal };
export default modal;
