export interface ModalList {
    [key: string]: (...args: any[]) => any;
}
declare let modalList: ModalList;
export declare const setModalList: (_modalList: ModalList) => void;
export default modalList;
