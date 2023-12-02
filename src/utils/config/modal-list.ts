export interface ModalList {
  [key: string]: (...args: any[]) => any;
}

let modalList: ModalList = {};

export const setModalList = (_modalList: ModalList) => {
  modalList = { ...modalList, ..._modalList };
};

export default modalList;
