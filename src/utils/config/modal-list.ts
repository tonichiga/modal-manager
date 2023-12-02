export interface ModalList {
  [key: string]: string;
}

let modalList: ModalList = {};

export const setModalList = (_modalList: ModalList) => {
  modalList = { ...modalList, ..._modalList };
};

export default modalList;
