/// <reference types="node" />
import { EventEmitter } from "events";
declare class Manager {
    emitter: EventEmitter;
    name: string | null;
    data: {
        [key: string]: any;
    };
    constructor();
    addEventListener(event: string, listener: (...args: any[]) => void): void;
    removeEventListener(event: string, listener: (...args: any[]) => void): void;
    emitChange(): void;
    close(...closeList: number[]): void;
    emitClose<T>(closeList?: T): void;
}
export default Manager;
