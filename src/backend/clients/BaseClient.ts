import { ConfigStorage } from "../utils/ConfigStorage";

export abstract class BaseClient extends ConfigStorage {
    handler;
    
    on(event, func) {
        this.handler.subscribe(event, func);
    }

    
}