import Manager from "./Manager";
declare class ModalManager extends Manager {
    constructor();
    create<T>(name: string, payload: {
        modalId: number;
        data?: T;
    }): void;
    call<T>(name: string, data?: T): void;
    close<T>(position?: T): void;
}
declare const modal: ModalManager;
export default modal;
