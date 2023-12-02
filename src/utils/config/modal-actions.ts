let modalActions = {};

interface ModalActions {
  [key: string]: string;
}

export const setModalActions = (actionList: ModalActions) => {
  modalActions = { ...modalActions, ...actionList };
};

export default modalActions;
