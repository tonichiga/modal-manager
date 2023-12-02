import Manager from "./Manager";
declare class ModalManager extends Manager {
    constructor();
    create(name: string, data: {
        [key: string]: any;
    }): void;
    call(name: string, data?: any): void;
    close(position?: number): void;
}
declare const modal: ModalManager;
export default modal;
