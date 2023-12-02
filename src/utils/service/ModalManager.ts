import Manager from "./Manager";
import { v4 as uuidv4 } from "uuid";

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
    this.emitter.emit(constants.CHANGE);
  }

  call(name: string, data: any = {}) {
    this.create(name, { modalId: uuidv4(), data });
  }

  close(position?: number) {
    this.emitter.emit(constants.CLOSE, position);
  }
}

const modal = new ModalManager();
export default modal;
