import Manager from "./Manager";
declare class ModalManager extends Manager {
    queue: string[];
    _openModalStateCallback: null | ((state: boolean) => void);
    constructor();
    create<T>(name: string, payload: {
        modalId: number;
        data?: T;
    }): void;
    call<T>(name: string, data?: T): void;
    close<T>(position?: T): void;
    getQueueState(): boolean;
    onOpenModalState(callback: (state: boolean) => void): void;
}
declare const modal: ModalManager;
export default modal;
