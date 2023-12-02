import { EventEmitter } from "events";

const Constants = {
  CHANGE: "change",
  CLOSE: "close",
};

type TData = {
  [key: string]: any;
};

class Manager {
  emitter: EventEmitter;
  name: string;
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
}

export default Manager;
