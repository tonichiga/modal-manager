import Manager from "./Manager";

function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}

const constants = {
  CHANGE: "change",
  CLOSE: "close",
};

class ModalManager extends Manager {
  constructor() {
    super();
  }

  create(name: string, data: { [key: string]: any }) {
    this.name = name;
    this.data = data;
    this.emitter.emit(constants.CHANGE, this.name, this.data);
  }

  call(name: string, data: any = {}) {
    this.create(name, { modalId: uniqueID(), data });
  }

  close<T>(position?: T) {
    this.emitter.emit(constants.CLOSE, position);
  }
}

const modal = new ModalManager();
export default modal;
