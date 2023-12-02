/// <reference types="node" />
import { EventEmitter } from "events";
declare class Manager {
    emitter: EventEmitter;
    name: string;
    data: {
        [key: string]: any;
    };
    constructor();
    addEventListener(event: string, listener: (...args: any[]) => void): void;
    removeEventListener(event: string, listener: (...args: any[]) => void): void;
}
export default Manager;
