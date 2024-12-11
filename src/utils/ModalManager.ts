import Manager from "./Manager";

function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}

export const constants = {
  CHANGE: "change",
  CLOSE: "close",
};

interface QueueState {
  queue: string[];
  closedModalName?: string | undefined;
  lastOpenedModal?: string | undefined;
}

interface ModalState {
  isHaveOpenModals: boolean;
  queue: string[];
  closedModalName?: string | undefined;
  lastOpenedModal?: string | undefined;
}

interface Options {
  showBackdrop?: boolean;
  extraClass?: string;
  openMinimized?: boolean;
}

export class ModalManager extends Manager {
  queue: string[] = [];
  _openModalStateCallback: null | ((props: ModalState) => void);

  constructor() {
    super();
    this.create = this.create.bind(this);
    this.call = this.call.bind(this);
    this.close = this.close.bind(this);
    this._openModalStateCallback = null;
  }

  create<T>(
    name: string,
    payload: { modalId: number; data?: T },
    options?: Options
  ) {
    this.name = name;
    this.data = payload;
    this.emitter.emit(constants.CHANGE, this.name, this.data, options);
  }

  call<T>(name: string, data?: T, options?: Options) {
    this.create<T>(name, { modalId: uniqueID(), data }, options);
    const lastOpenedModal = name;
    this.queue.push(name);

    this._openModalStateCallback?.(
      this.getQueueState({
        queue: this.queue,
        lastOpenedModal,
      })
    );
  }

  close<T>(position?: T) {
    this.emitter.emit(constants.CLOSE, position ?? this.queue?.length - 1);
    const closedModalName = this.queue[this.queue.length - 1];
    this.queue.pop();

    this._openModalStateCallback?.(
      this.getQueueState({
        queue: this.queue,
        closedModalName,
      })
    );
  }

  getQueueState({ queue, closedModalName, lastOpenedModal }: QueueState) {
    return {
      isHaveOpenModals: queue.length > 0,
      queue,
      lastOpenedModal: lastOpenedModal,
      closedModalName,
    };
  }

  onOpenModalState(callback: (state: ModalState) => void) {
    this._openModalStateCallback = callback;
  }
}

const modal = new ModalManager();
export default modal;
