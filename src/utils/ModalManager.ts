import Manager from "./Manager";

function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}

const constants = {
  CHANGE: "change",
  CLOSE: "close",
};

class ModalManager extends Manager {
  queue: string[] = [];

  constructor() {
    super();
    this.create = this.create.bind(this);
    this.call = this.call.bind(this);
    this.close = this.close.bind(this);
  }

  create<T>(name: string, payload: { modalId: number; data?: T }) {
    this.name = name;
    this.data = payload;
    this.emitter.emit(constants.CHANGE, this.name, this.data);
  }

  call<T>(name: string, data?: T) {
    this.create<T>(name, { modalId: uniqueID(), data });
    this.queue.push(name);
  }

  close<T>(position?: T) {
    this.emitter.emit(constants.CLOSE, position);
    this.queue.pop();
  }

  get haveOpenModal() {
    return this.queue.length > 0;
  }
}

const modal = new ModalManager();
export default modal;
