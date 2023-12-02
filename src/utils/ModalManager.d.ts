import Manager from "./Manager";
declare class ModalManager extends Manager {
    constructor();
    create(name: string, data: {
        [key: string]: any;
    }): void;
    call(name: string, data?: any): void;
    close<T>(position?: T): void;
}
declare const modal: ModalManager;
export default modal;
