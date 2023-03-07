import { ConfigStorage } from '../utils/ConfigStorage';

export abstract class BaseClient extends ConfigStorage {
    handlers: any[] = [];
    events: any[] = [];

    on(event, func) {
        for (let handler of this.handlers) {
            handler.subscribe(event, func);
        }

        this.events.push([event, func]);
    }

    connectHandler(handler) {
        this.handlers.push(handler);
        for (let i of this.events) {
            handler.subscribe(i[0], i[1]);
        }
        return handler;
    }
}
