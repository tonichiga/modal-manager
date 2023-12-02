import { EventEmitter } from "events";

const constants = {
  CHANGE: "change",
  CLOSE: "close",
};

type TData = {
  [key: string]: any;
};

class Manager {
  emitter: EventEmitter;
  name: string | null;
  data: { [key: string]: any };

  constructor() {
    this.name = "";
    this.data = {};
    this.emitter = new EventEmitter();
  }

  addEventListener(event: string, listener: (...args: any[]) => void) {
    this.emitter.addListener(event, listener);
  }

  removeEventListener(event: string, listener: (...args: any[]) => void) {
    this.emitter.removeListener(event, listener);
  }
  emitChange() {
    this.emitter.emit(constants.CHANGE, this.name, this.data);
  }
  close(...closeList: number[]) {
    this.name = null;
    this.data = {};
    this.emitClose(closeList);
  }
  emitClose<T>(closeList?: T) {
    this.emitter.emit(constants.CLOSE, closeList);
  }
}

export default Manager;
